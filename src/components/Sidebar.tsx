import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-80 xl:w-96">
      <div className="sticky top-20 rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 shadow-lg shadow-black/20 ring-1 ring-white/[0.02] backdrop-blur-sm">
        <p className="border-b border-slate-800/80 pb-4 text-lg font-semibold text-slate-100">著者プロフィール</p>
        <div
          className="mx-auto mt-5 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600/30 to-slate-700/50 text-2xl font-semibold text-cyan-200/90 ring-2 ring-cyan-500/20"
          aria-hidden
        >
          LL
        </div>
        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          札幌を拠点に活動する美容師兼エンジニア。SES 企業に勤めながらモダンな Web 技術を学習中。個人サイト「LogLog」を開発しています。
        </p>
        <Link
          href="/about"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-cyan-500/15 py-3 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-500/30 transition hover:bg-cyan-500/25 hover:text-cyan-50"
        >
          詳細を見る
        </Link>
      </div>
    </aside>
  )
}
