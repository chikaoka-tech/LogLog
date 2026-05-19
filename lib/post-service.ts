import "server-only"
import type { Post } from "@/src/generated/prisma/client"
import { prisma } from "@/lib/db"
import { resolveEyecatch } from "@/lib/eyecatch"
import type { Blog } from "@/lib/types"

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function postToBlog(row: Post): Blog {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    publishedAt: formatDate(row.updatedAt),
    updatedAt: formatDate(row.updatedAt),
    eyecatch: resolveEyecatch(row.slug, row.eyecatchUrl),
    eyecatchUrl: row.eyecatchUrl,
    tags: row.tags,
    published: row.published,
  }
}

function logDbError(context: string, error: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[post-service] ${context}:`, error)
  }
}

/** 管理画面：全記事（下書き含む） */
export async function getAdminPosts(): Promise<Blog[]> {
  try {
    const rows = await prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
    })
    return rows.map(postToBlog)
  } catch (error) {
    logDbError("getAdminPosts", error)
    return []
  }
}

/** 管理画面：ID で1件 */
export async function getAdminPostById(id: string): Promise<Blog | null> {
  try {
    const row = await prisma.post.findUnique({ where: { id: id.trim() } })
    return row ? postToBlog(row) : null
  } catch (error) {
    logDbError("getAdminPostById", error)
    return null
  }
}

/** 公開サイト：公開済みのみ */
export async function getPublishedDbPosts(): Promise<Blog[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
    })
    return rows.map(postToBlog)
  } catch (error) {
    logDbError("getPublishedDbPosts", error)
    return []
  }
}

/** 公開サイト：slug で1件（公開済みのみ） */
export async function getPublishedPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const row = await prisma.post.findFirst({
      where: { slug: slug.trim(), published: true },
    })
    return row ? postToBlog(row) : null
  } catch (error) {
    logDbError("getPublishedPostBySlug", error)
    return null
  }
}

export type CreatePostInput = {
  title: string
  slug: string
  description: string
  eyecatchUrl: string
  content: string
  tags: string[]
  published: boolean
}

export async function createPost(input: CreatePostInput): Promise<Blog> {
  const row = await prisma.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      eyecatchUrl: input.eyecatchUrl,
      content: input.content,
      tags: input.tags,
      published: input.published,
    },
  })
  return postToBlog(row)
}

export async function updatePost(
  id: string,
  input: CreatePostInput,
): Promise<Blog> {
  const row = await prisma.post.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      eyecatchUrl: input.eyecatchUrl,
      content: input.content,
      tags: input.tags,
      published: input.published,
    },
  })
  return postToBlog(row)
}

export async function deletePost(id: string): Promise<void> {
  await prisma.post.delete({ where: { id } })
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const row = await prisma.post.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    })
    return row !== null
  } catch (error) {
    logDbError("isSlugTaken", error)
    return false
  }
}
