import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

// Public read-only client (uses CDN, for SSG/ISR)
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

// Authenticated server-side client (bypasses CDN, for fresh data)
export const serverClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
      perspective: 'published',
    })
  : null
