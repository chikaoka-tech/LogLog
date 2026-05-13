import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import { blogPosts, getPostById } from "@/lib/blog-posts"

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ id: String(p.id) }))
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

  const heroSrc = `https://picsum.photos/seed/${encodeURIComponent(post.imageSeed)}/1200/630`

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Article</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <time dateTime={post.date}>{post.date}</time>
                <span className="rounded-full border border-cyan-800/60 bg-cyan-950/40 px-2.5 py-1 text-xs font-medium text-cyan-300/95">
                  {post.tag}
                </span>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 shadow-xl shadow-black/30 ring-1 ring-white/[0.03]">
                <Image
                  src={heroSrc}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 768px"
                  priority
                />
              </div>

              <article
                className="prose prose-slate prose-invert mt-10 max-w-none leading-relaxed prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-100 prose-code:rounded-md prose-code:bg-slate-800/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-900/80 prose-blockquote:border-cyan-700/40 prose-blockquote:text-slate-400 prose-hr:border-slate-800 prose-li:marker:text-cyan-600"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
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
