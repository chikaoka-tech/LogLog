import type { Metadata } from "next"
import PostList from "@/components/PostList"
import TagList from "@/components/TagList"
import { blogPosts, getFilteredPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "LogLog の記事一覧です。",
}

type BlogPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams
  const raw = sp.tag
  const tag = Array.isArray(raw) ? raw[0] : raw
  const trimmed = tag?.trim()
  const posts = trimmed ? getFilteredPosts(trimmed) : blogPosts

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Archive</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Blog</h1>
        <p className="mt-3 text-slate-400">これまでに公開した記事の一覧です。</p>
      </header>
      <TagList activeTag={trimmed} />
      <PostList posts={posts} />
    </div>
  )
}
