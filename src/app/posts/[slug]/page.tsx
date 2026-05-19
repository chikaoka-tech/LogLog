import Link from "next/link"
import { notFound } from "next/navigation"
import EyecatchImage from "@/components/EyecatchImage"
import MarkdownContent from "@/components/MarkdownContent"
import Sidebar from "@/components/Sidebar"
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-posts"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "記事が見つかりません" }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
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
              <header className="border-b border-slate-800/80 pb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Article</p>
                <h1 className="mt-3 break-words text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
                  {post.title}
                </h1>
                {post.description ? (
                  <p className="mt-3 text-pretty text-base leading-relaxed text-slate-400">{post.description}</p>
                ) : null}
                <div className="mt-5 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3">
                  <time
                    className="inline-flex shrink-0 items-center rounded-md border border-slate-800/90 bg-slate-900/50 px-2.5 py-1 text-sm tabular-nums text-slate-400"
                    dateTime={post.publishedAt}
                  >
                    {post.publishedAt}
                  </time>
                  {post.tags.length > 0 ? (
                    <ul className="flex min-w-0 flex-wrap gap-2" aria-label="タグ">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <Link
                            href={`/posts?tag=${encodeURIComponent(tag)}`}
                            className="inline-flex max-w-full break-words rounded-full border border-cyan-800/60 bg-cyan-950/40 px-3 py-1 text-xs font-medium leading-snug text-cyan-300/95 transition hover:border-cyan-500/50 hover:bg-cyan-900/50 hover:text-cyan-100 [overflow-wrap:anywhere]"
                          >
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </header>

              <div className="relative mt-8 max-w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 shadow-xl shadow-black/30 ring-1 ring-white/[0.03]">
                <EyecatchImage
                  title={post.title}
                  url={post.eyecatch.url}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1152px) 90vw, 768px"
                />
              </div>

              <article className="mt-10">
                <MarkdownContent content={post.content} />
              </article>

              <div className="mt-12 flex justify-center border-t border-slate-800/80 pt-10">
                <Link
                  href="/posts"
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
