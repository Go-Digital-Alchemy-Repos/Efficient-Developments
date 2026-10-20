import { useEffect, useState } from 'react'

export type Job = {
  id: string
  title: string
  department: string
  location: string
  employment: string
  description: string
  responsibilities: string
  requirements: string
  status: 'draft' | 'published' | 'closed'
  sample: boolean
  updatedAt?: string
}
export type Application = {
  id: string; jobId: string; jobTitle: string; name: string; email: string; phone: string
  message: string; resumeName: string; submittedAt: string; status: string
}
export async function careersApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/careers${path}`, { credentials: 'same-origin', ...options })
  const data = await response.json().catch(() => ({ error: 'Careers is temporarily unavailable. Please try again.' }))
  if (!response.ok) throw new Error(data.error ?? 'Unable to complete this request.')
  return data as T
}
export function jsonRequest(method: string, value: unknown): RequestInit {
  return { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) }
}
export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    careersApi<{ jobs: Job[] }>('/jobs', { signal: controller.signal })
      .then((data) => setJobs(data.jobs))
      .catch((error) => { if (!controller.signal.aborted) setError(error.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])
  return { jobs, loading, error }
}
