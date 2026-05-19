import type { Metadata } from "next"
import Link from "next/link"
import PostForm from "@/components/admin/PostForm"

export const metadata: Metadata = {
  title: "New post",
}

export default function AdminNewPostPage() {
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
        <span className="text-slate-300">New</span>
      </nav>

      <div className="mb-8 border-b border-slate-800/90 pb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <Link href="/admin/posts" className="font-medium text-slate-400 transition hover:text-cyan-400/90">
            Posts
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">New</span>
        </div>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">Create post</h1>
        <p className="mt-1 text-sm text-slate-500">
          新しい記事を Supabase に保存します。タグはマスター一覧から選択、ステータスで下書き／公開を選べます。
        </p>
      </div>

      <PostForm mode="create" />
    </div>
  )
}
