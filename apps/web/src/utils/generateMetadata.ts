import processUrl, { BASE_URL } from './processUrl'
import type { Metadata } from 'next'

export default async function processMetadata(page): Promise<Metadata> {
  const url = processUrl(page, { base: true })
  const { metaTitle, metaDesc, ogImage, noIndex, noFollow } = page.seo || ''
  return {
    metadataBase: new URL(BASE_URL),
    title: metaTitle || page.title,
    description: metaDesc,
    openGraph: {
      type: 'website',
      url,
      title: metaTitle,
      description: metaDesc,
      images: ogImage
    },
    robots: {
      index: !noIndex,
      follow: !noFollow
    },
    alternates: {
      canonical: url
    }
  }
}
