import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "LogLog について。",
}

export default function AboutPage() {
  return (
    <div className="relative min-w-0 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(34,211,238,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">About</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          このサイトについて
        </h1>
        <div className="mt-8 rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 shadow-lg shadow-black/20 ring-1 ring-white/[0.02] sm:p-8">
          <div className="prose prose-invert prose-slate max-w-none text-slate-300 prose-p:leading-relaxed prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-100">
            <p>
              LogLog は、エンジニアとしての学習や実装のメモを整理して公開する個人ブログです。フロントエンドを中心に、気になった技術や設計の考え方を書き留めています。
            </p>
            <p>
              ご連絡やフィードバックは、SNS やブログのコメント欄など、お好みのチャネルからどうぞ（ダミーテキストです）。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
