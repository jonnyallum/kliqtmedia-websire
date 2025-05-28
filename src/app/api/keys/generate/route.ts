/**
 * API Key Generation Endpoint
 * POST /api/keys/generate
 * Requires user authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Get user from session (you'll need to implement proper auth)
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      name,
      scopes = ['read_jobs'],
      expires_at
    } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      )
    }

    // Validate scopes
    const validScopes = ['read_jobs', 'post_jobs', 'manage_jobs']
    const invalidScopes = scopes.filter((scope: string) => !validScopes.includes(scope))
    
    if (invalidScopes.length > 0) {
      return NextResponse.json(
        { error: `Invalid scopes: ${invalidScopes.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate API key using the database function
    const { data: keyResult, error: keyError } = await supabase
      .rpc('generate_api_key')

    if (keyError || !keyResult) {
      return NextResponse.json(
        { error: 'Failed to generate API key' },
        { status: 500 }
      )
    }

    const apiKey = keyResult

    // Insert API key record
    const { data: apiKeyData, error: insertError } = await supabase
      .from('api_keys')
      .insert([{
        user_id: user.id,
        key: apiKey,
        name,
        scopes,
        expires_at: expires_at ? new Date(expires_at).toISOString() : null,
        is_active: true
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Database error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save API key' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API key generated successfully',
      data: {
        id: apiKeyData.id,
        key: apiKey,
        name: apiKeyData.name,
        scopes: apiKeyData.scopes,
        expires_at: apiKeyData.expires_at,
        created_at: apiKeyData.created_at
      }
    }, { status: 201 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to list user's API keys
export async function GET(request: NextRequest) {
  try {
    // Get user from session
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Verify JWT token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

    // Get user's API keys (excluding the actual key for security)
    const { data: apiKeys, error } = await supabase
      .from('api_keys')
      .select('id, name, scopes, expires_at, is_active, last_used_at, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: apiKeys
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}