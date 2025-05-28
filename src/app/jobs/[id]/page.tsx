/**
 * Individual Job Detail Page
 * Detailed view of a specific job listing
 */

import { notFound } from 'next/navigation'
import sampleJobs, { Job } from '@/data/sampleJobs'
import JobDetailClient from './JobDetailClient'

// Mock data with sample jobs for demo
const mockJobs: Job[] = sampleJobs.map((job, index) => ({
  ...job,
  id: `job-${index + 1}`,
  created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
}))

// Generate static params for all job IDs - Required for Next.js static export
export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }))
}

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = mockJobs.find(j => j.id === params.id)

  if (!job) {
    notFound()
  }

  return <JobDetailClient job={job} />
}