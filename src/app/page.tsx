import Link from "next/link"
import PostList from "@/components/PostList"

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
        aria-hidden
      />
      <section className="relative mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-6 sm:pb-10 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Engineer blog</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
          学びと実装を、すっきり記録する。
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
          フロントエンドからバックエンドまで。日々のメモと試行錯誤を LogLog に残しています。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            記事一覧へ
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/80 hover:text-white"
          >
            このサイトについて
          </Link>
        </div>
      </section>

      <section id="articles" className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex flex-col gap-2 border-b border-slate-800/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">Latest articles</h2>
            <p className="mt-1 text-sm text-slate-500">直近の投稿です。</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-cyan-400/90 transition hover:text-cyan-300"
          >
            すべて見る →
          </Link>
        </div>
        <PostList />
      </section>
    </div>
  )
}
