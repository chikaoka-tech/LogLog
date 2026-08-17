import "server-only"
import { getPublishedDbPosts, getPublishedPostBySlug } from "@/lib/post-service"
import type { Blog } from "./types"

/** 公開記事一覧（管理画面で公開したものだけ） */
export async function getBlogPosts(): Promise<Blog[]> {
  return getPublishedDbPosts()
}

export async function getPostBySlug(slug: string): Promise<Blog | undefined> {
  const s = slug.trim()
  if (!s) return undefined

  const dbPost = await getPublishedPostBySlug(s)
  return dbPost ?? undefined
}

/** @deprecated 管理画面は getAdminPostById を使用 */
export async function getPostById(id: string): Promise<Blog | undefined> {
  const { getAdminPostById } = await import("@/lib/post-service")
  const post = await getAdminPostById(id.trim())
  return post ?? undefined
}

export async function getAllTags(): Promise<string[]> {
  const seen = new Set<string>()
  for (const post of await getBlogPosts()) {
    for (const tag of post.tags) {
      seen.add(tag)
    }
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b, "ja"))
}

export async function getFilteredPosts(tag: string): Promise<Blog[]> {
  const t = tag.trim()
  const posts = await getBlogPosts()
  if (!t) return [...posts]
  return posts.filter((post) => post.tags.includes(t))
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getBlogPosts()
  return posts.map((p) => p.slug)
}
