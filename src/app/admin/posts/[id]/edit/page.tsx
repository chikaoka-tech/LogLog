import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdminPostById } from "@/lib/post-service"
import PostForm from "@/components/admin/PostForm"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getAdminPostById(id)
  return { title: post ? `Edit: ${post.title}` : "Edit post" }
}

export default async function AdminEditPostPage({ params }: PageProps) {
  const { id } = await params
  const post = await getAdminPostById(id)
  if (!post) notFound()

  return (
    <div className="min-w-0">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 lg:hidden" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-cyan-400/90">
          Site
        </Link>
        <span aria-hidden>/</span>
        <Link href="/admin/posts" className="hover:text-cyan-400/90">
          Posts
        </Link>
        <span aria-hidden>/</span>
        <span className="text-slate-300">Edit</span>
      </nav>

      <div className="mb-8 border-b border-slate-800/90 pb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <Link href="/admin/posts" className="font-medium text-slate-400 transition hover:text-cyan-400/90">
            Posts
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Edit</span>
        </div>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">Edit post</h1>
        <p className="mt-1 text-sm text-slate-500">{post.title}</p>
      </div>

      <PostForm
        mode="edit"
        postId={post.id}
        defaultValues={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          eyecatchUrl: post.eyecatchUrl ?? "",
          content: post.content.trim(),
          tags: post.tags,
          status: post.published ? "published" : "draft",
        }}
      />
    </div>
  )
}
