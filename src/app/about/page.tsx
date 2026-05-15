import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "LogLog について。",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl min-w-0 px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">About</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">このサイトについて</h1>
      <div className="prose prose-invert prose-slate mt-8 max-w-none text-slate-300 prose-p:leading-relaxed prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-100">
        <p>
          LogLog は、エンジニアとしての学習や実装のメモを整理して公開する個人ブログです。フロントエンドを中心に、気になった技術や設計の考え方を書き留めています。
        </p>
        <p>
          ご連絡やフィードバックは、SNS やブログのコメント欄など、お好みのチャネルからどうぞ（ダミーテキストです）。
        </p>
      </div>
    </div>
  )
}
