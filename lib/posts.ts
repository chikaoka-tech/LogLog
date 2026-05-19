import "server-only"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { resolveEyecatch } from "@/lib/eyecatch"
import { getPublishedDbPosts, getPublishedPostBySlug } from "@/lib/post-service"
import type { Blog } from "./types"

const POSTS_DIR = path.join(process.cwd(), "posts")

type FrontMatter = {
  title?: string
  date?: string
  slug?: string
  tags?: string[] | string
  excerpt?: string
}

function normalizeTags(raw: FrontMatter["tags"]): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map((t) => String(t).trim()).filter(Boolean)
  return String(raw)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

function parseMarkdownFile(filePath: string): Blog | null {
  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  const fm = data as FrontMatter
  const basename = path.basename(filePath, ".md")

  const title = fm.title?.trim()
  if (!title) return null

  const slug = (fm.slug ?? basename).trim()
  const date = (fm.date ?? new Date().toISOString().slice(0, 10)).trim()
  const description = (fm.excerpt ?? "").trim() || title

  return {
    id: slug,
    slug,
    title,
    description,
    content: content.trim(),
    publishedAt: date,
    updatedAt: date,
    eyecatch: resolveEyecatch(slug),
    tags: normalizeTags(fm.tags),
  }
}

function readMarkdownPosts(): Blog[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort()

  const posts: Blog[] = []
  for (const file of files) {
    const parsed = parseMarkdownFile(path.join(POSTS_DIR, file))
    if (parsed) posts.push(parsed)
  }

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

async function getMergedPublishedPosts(): Promise<Blog[]> {
  const [dbPosts, mdPosts] = await Promise.all([getPublishedDbPosts(), Promise.resolve(readMarkdownPosts())])
  const dbSlugs = new Set(dbPosts.map((p) => p.slug))
  const markdownOnly = mdPosts.filter((p) => !dbSlugs.has(p.slug))
  return [...dbPosts, ...markdownOnly].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** 公開記事一覧（DB 公開済み + Markdown、slug 重複時は DB 優先） */
export async function getBlogPosts(): Promise<Blog[]> {
  return getMergedPublishedPosts()
}

export async function getPostBySlug(slug: string): Promise<Blog | undefined> {
  const s = slug.trim()
  if (!s) return undefined

  const dbPost = await getPublishedPostBySlug(s)
  if (dbPost) return dbPost

  const mdPosts = readMarkdownPosts()
  return mdPosts.find((p) => p.slug === s)
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
