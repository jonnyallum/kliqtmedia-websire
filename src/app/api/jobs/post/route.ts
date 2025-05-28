/**
 * Protected Jobs API - Post Job
 * POST /api/jobs/post
 * Requires API key authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// API key authentication middleware
async function validateApiKey(apiKey: string) {
  if (!apiKey || !apiKey.startsWith('kliqt_')) {
    return { valid: false, error: 'Invalid API key format' }
  }

  const { data: keyData, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', apiKey)
    .eq('is_active', true)
    .single()

  if (error || !keyData) {
    return { valid: false, error: 'Invalid API key' }
  }

  // Check if key is expired
  if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
    return { valid: false, error: 'API key expired' }
  }

  // Check if key has required scopes
  if (!keyData.scopes.includes('post_jobs')) {
    return { valid: false, error: 'Insufficient permissions' }
  }

  // Update last used timestamp
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', keyData.id)

  return { valid: true, userId: keyData.user_id }
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required in x-api-key header' },
        { status: 401 }
      )
    }

    const authResult = await validateApiKey(apiKey)
    if (!authResult.valid) {
      return NextResponse.json(
        { error: authResult.error },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      title,
      description,
      type, // 'wanted' or 'available'
      category,
      budget_min,
      budget_max,
      currency = 'GBP',
      location,
      remote = true,
      requirements,
      company_name,
      company_description,
      contact_email,
      contact_phone,
      website_url,
      featured = false,
      urgent = false
    } = body

    // Validate required fields
    if (!title || !description || !type || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, type, category' },
        { status: 400 }
      )
    }

    // Validate type
    if (!['wanted', 'available'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "wanted" or "available"' },
        { status: 400 }
      )
    }

    // Get category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('job_categories')
      .select('id')
      .eq('name', category)
      .single()

    if (categoryError || !categoryData) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Insert job
    const { data: jobData, error: jobError } = await supabase
      .from('jobs')
      .insert([{
        title,
        description,
        type,
        category_id: categoryData.id,
        budget_min,
        budget_max,
        currency,
        location,
        remote,
        requirements,
        company_name,
        company_description,
        contact_email,
        contact_phone,
        website_url,
        featured,
        urgent,
        status: 'active',
        posted_by: authResult.userId
      }])
      .select()
      .single()

    if (jobError) {
      console.error('Database error:', jobError)
      return NextResponse.json(
        { error: 'Failed to create job' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Job posted successfully',
      data: {
        id: jobData.id,
        title: jobData.title,
        type: jobData.type,
        status: jobData.status,
        created_at: jobData.created_at
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