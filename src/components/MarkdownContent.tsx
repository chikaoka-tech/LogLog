import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownContentProps = {
  content: string
}

const proseClass =
  "prose prose-slate prose-invert max-w-full min-w-0 leading-relaxed break-words prose-headings:scroll-mt-24 prose-headings:break-words prose-headings:font-semibold prose-headings:text-slate-100 prose-p:max-w-none prose-p:text-slate-300 prose-a:break-words prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-100 prose-code:break-words prose-code:rounded-md prose-code:bg-slate-800/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-200 prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:border prose-pre:border-slate-800 prose-pre:bg-slate-900/80 prose-blockquote:border-cyan-700/40 prose-blockquote:text-slate-400 prose-hr:border-slate-800 prose-li:marker:text-cyan-600 prose-img:max-w-full prose-table:text-sm prose-th:text-slate-200 prose-td:text-slate-400"

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className={proseClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
