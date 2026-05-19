import type { Metadata } from "next"
import Link from "next/link"
import { getAdminPosts } from "@/lib/post-service"
import PostRowActions from "@/components/admin/PostRowActions"

export const metadata: Metadata = {
  title: "Posts",
}

function formatTags(tags: string[]) {
  if (tags.length === 0) return "—"
  return tags.join(", ")
}

export default async function AdminPostsPage() {
  const posts = await getAdminPosts()

  return (
    <div className="min-w-0">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 lg:hidden" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-cyan-400/90">
          Site
        </Link>
        <span aria-hidden>/</span>
        <span className="text-slate-400">Admin</span>
        <span aria-hidden>/</span>
        <span className="text-slate-300">Posts</span>
      </nav>

      <div className="flex flex-col gap-4 border-b border-slate-800/90 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">Posts</h1>
          <p className="mt-1 text-sm text-slate-500">Supabase 上の記事を一覧・作成・編集・削除します。</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-9 shrink-0 items-center justify-center self-start rounded-md border border-cyan-700/50 bg-cyan-950/40 px-3.5 text-sm font-medium text-cyan-100 shadow-sm transition hover:bg-cyan-900/40 sm:self-auto"
        >
          新規作成
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-slate-700/80 bg-slate-900/30 px-4 py-8 text-center text-sm text-slate-500">
          記事がありません。
          <Link href="/admin/posts/new" className="ml-1 text-cyan-400/90 hover:text-cyan-300">
            新規作成
          </Link>
          から追加してください。
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800/90 bg-[#161b22]/40 shadow-sm">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800/90 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
                  Title
                </th>
                <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
                  Slug
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Description
                </th>
                <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
                  Tags
                </th>
                <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="whitespace-nowrap px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-800/60 transition last:border-0 hover:bg-slate-800/30"
                >
                  <td className="max-w-[200px] px-4 py-3 align-top font-medium text-slate-100">
                    <span className="line-clamp-2 break-words">{post.title}</span>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 align-top font-mono text-xs text-slate-400">
                    <span className="break-all">{post.slug}</span>
                  </td>
                  <td className="max-w-xs px-4 py-3 align-top text-slate-500">
                    <span className="line-clamp-2 break-words text-[13px] leading-snug">{post.description}</span>
                  </td>
                  <td className="max-w-[180px] px-4 py-3 align-top text-xs text-slate-500">
                    <span className="line-clamp-2 break-words">{formatTags(post.tags)}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top">
                    <span
                      className={
                        post.published
                          ? "inline-flex rounded-full border border-emerald-800/60 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-medium text-emerald-200/95"
                          : "inline-flex rounded-full border border-slate-600/80 bg-slate-800/60 px-2 py-0.5 text-[11px] font-medium text-slate-400"
                      }
                    >
                      {post.published ? "公開" : "下書き"}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] tabular-nums text-slate-600">
                      {post.updatedAt}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top text-right">
                    <PostRowActions
                      postId={post.id}
                      postTitle={post.title}
                      slug={post.slug}
                      isPublished={post.published ?? false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-600">
        公開 URL は <span className="font-mono text-slate-500">/posts/&lt;slug&gt;</span>（公開ステータスのみ表示）です。
      </p>
    </div>
  )
}
