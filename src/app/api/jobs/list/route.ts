/**
 * Public Jobs API - List Jobs
 * GET /api/jobs/list
 * Returns public job listings with optional filters
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'wanted' or 'available'
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const featured = searchParams.get('featured') === 'true'

    // Build query
    let query = supabase
      .from('jobs')
      .select(`
        id,
        title,
        description,
        type,
        category,
        budget_min,
        budget_max,
        currency,
        location,
        remote,
        featured,
        urgent,
        views_count,
        applications_count,
        created_at,
        job_categories!inner(name, icon, color)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (type) {
      query = query.eq('type', type)
    }
    if (category) {
      query = query.eq('category', category)
    }
    if (featured) {
      query = query.eq('featured', true)
    }

    const { data: jobs, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: 500 }
      )
    }

    // Transform data for public API
    const publicJobs = jobs?.map((job: any) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      type: job.type,
      category: {
        name: job.job_categories?.name || 'Unknown',
        icon: job.job_categories?.icon || 'Briefcase',
        color: job.job_categories?.color || '#666666'
      },
      budget: {
        min: job.budget_min,
        max: job.budget_max,
        currency: job.currency
      },
      location: job.location,
      remote: job.remote,
      featured: job.featured,
      urgent: job.urgent,
      stats: {
        views: job.views_count,
        applications: job.applications_count
      },
      created_at: job.created_at
    }))

    return NextResponse.json({
      success: true,
      data: publicJobs,
      meta: {
        total: publicJobs?.length || 0,
        limit,
        offset
      }
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}