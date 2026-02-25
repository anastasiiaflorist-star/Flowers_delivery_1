import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio — La Fleur',
  description: 'Content management studio for La Fleur Flower Shop.',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
