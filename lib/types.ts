/** 記事データ（CMS / 静的データ共通） */
export type Blog = {
  id: string
  slug: string
  title: string
  content: string
  publishedAt: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  tags: string[]
  updatedAt: string
  description: string
  /** DB 保存のアイキャッチ URL（空なら slug から自動生成） */
  eyecatchUrl?: string
  /** DB 由来の記事のみ。Markdown 由来は undefined（公開扱い） */
  published?: boolean
}
