import Link from "next/link"
import { notFound } from "next/navigation"
import EyecatchImage from "@/components/EyecatchImage"
import Sidebar from "@/components/Sidebar"
import { blogPosts, getPostById } from "@/lib/blog-posts"

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) return { title: "記事が見つかりません" }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.08),transparent)]"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Article</p>
              <h1 className="mt-2 break-words text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
                <time className="shrink-0 tabular-nums" dateTime={post.publishedAt}>
                  {post.publishedAt}
                </time>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex max-w-full break-words rounded-full border border-cyan-800/60 bg-cyan-950/40 px-2.5 py-1.5 text-xs font-medium leading-snug text-cyan-300/95 [overflow-wrap:anywhere]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative mt-8 max-w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 shadow-xl shadow-black/30 ring-1 ring-white/[0.03]">
                <EyecatchImage
                  title={post.title}
                  url={post.eyecatch.url}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1152px) 90vw, 768px"
                />
              </div>

              <article
                className="prose prose-slate prose-invert mt-10 max-w-full min-w-0 leading-relaxed break-words prose-headings:scroll-mt-24 prose-headings:break-words prose-headings:font-semibold prose-headings:text-slate-100 prose-p:max-w-none prose-p:text-slate-300 prose-a:break-words prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-100 prose-code:break-words prose-code:rounded-md prose-code:bg-slate-800/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-900/80 prose-blockquote:border-cyan-700/40 prose-blockquote:text-slate-400 prose-hr:border-slate-800 prose-li:marker:text-cyan-600 prose-img:max-w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 flex justify-center border-t border-slate-800/80 pt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:bg-slate-800/80 hover:text-cyan-100"
                >
                  一覧に戻る
                </Link>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
