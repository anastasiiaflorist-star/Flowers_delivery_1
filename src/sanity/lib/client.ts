import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

let _client: SanityClient | null = null

export function getClient(): SanityClient | null {
  if (!projectId) return null
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: true })
  }
  return _client
}

// Convenience export — may be null if projectId is not configured
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null
