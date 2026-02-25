'use client'

type Block = {
  _type: string
  _key: string
  style?: string
  children?: Array<{ _key: string; _type: string; text: string; marks?: string[] }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
}

interface PortableTextRendererProps {
  value: Block[] | unknown[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value)) return null

  return (
    <div className="prose prose-pink max-w-none">
      {(value as Block[]).map((block) => {
        if (block._type !== 'block') return null

        const text = block.children?.map((child) => child.text).join('') || ''

        switch (block.style) {
          case 'h1':
            return <h1 key={block._key} className="text-2xl font-serif font-bold text-[#3a1e1e] mb-3">{text}</h1>
          case 'h2':
            return <h2 key={block._key} className="text-xl font-serif font-bold text-[#3a1e1e] mb-3">{text}</h2>
          case 'h3':
            return <h3 key={block._key} className="text-lg font-serif font-semibold text-[#3a1e1e] mb-2">{text}</h3>
          default:
            return (
              <p key={block._key} className="text-[#5a3a3a] leading-relaxed mb-3">
                {block.children?.map((child) => {
                  if (child.marks?.includes('strong')) {
                    return <strong key={child._key}>{child.text}</strong>
                  }
                  if (child.marks?.includes('em')) {
                    return <em key={child._key}>{child.text}</em>
                  }
                  return <span key={child._key}>{child.text}</span>
                })}
              </p>
            )
        }
      })}
    </div>
  )
}
