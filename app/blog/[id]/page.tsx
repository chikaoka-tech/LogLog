import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
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
  if (!post) return { title: "記事が見つかりません | LogLog" }
  return {
    title: `${post.title} | LogLog`,
    description: post.description,
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { id } = await params
  const post = getPostById(id)
  if (!post) notFound()

  const heroSrc = `https://picsum.photos/seed/${encodeURIComponent(post.imageSeed)}/1200/630`

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-10 border-b border-cyan-900/70 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-cyan-300">
            LogLog
          </Link>
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <li>
                <Link className="transition hover:text-cyan-300" href="/">
                  Home
                </Link>
              </li>
              <li>
                <a className="transition hover:text-cyan-300" href="#">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-widest text-cyan-400/80">Article</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <time dateTime={post.date}>{post.date}</time>
                <span className="rounded-full border border-cyan-800 bg-cyan-950/50 px-2.5 py-1 text-xs font-medium text-cyan-300">
                  {post.tag}
                </span>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-cyan-950/20">
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
                className="prose prose-slate prose-invert mt-10 max-w-none leading-relaxed prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-100 prose-code:rounded prose-code:bg-slate-800/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-900 prose-blockquote:border-cyan-700/50 prose-blockquote:text-slate-400 prose-hr:border-slate-800 prose-li:marker:text-cyan-600"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              <div className="mt-12 flex justify-center border-t border-slate-800 pt-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-cyan-800 bg-cyan-950/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-600 hover:bg-cyan-900/50 hover:text-cyan-100"
                >
                  一覧に戻る
                </Link>
              </div>
            </div>
          </div>

          <aside className="w-full shrink-0 lg:w-72 lg:pt-2">
            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-800/80 bg-gradient-to-br from-slate-800 to-cyan-950/70 text-lg font-semibold text-cyan-200">
                美容
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-100">プロフィール</h2>
              <p className="mt-1 text-sm font-medium text-cyan-300/90">美容師 / IT学習中</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                都内サロンで美容師として<strong className="font-medium text-slate-200">約9年</strong>
                。カット・カラー・スタイリングを中心に、お客様の日常に寄り添う提案を大切にしています。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                業務の合間に<strong className="font-medium text-slate-200">プログラミングとインフラ</strong>
                を学習中。現場の手間を減らす仕組みづくりにも興味があります。
              </p>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                このブログでは技術メモと、サロンとエンジニアリングの交差点からの気づきを書いていきます。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
