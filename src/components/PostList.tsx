import Link from "next/link"
import type { Blog } from "@/types/blog"
import EyecatchImage from "@/components/EyecatchImage"
import { blogPosts } from "@/lib/posts"

type PostListProps = {
  posts?: Blog[]
}

export default function PostList({ posts = blogPosts }: PostListProps) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="group block min-w-0 w-full overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/40 shadow-sm shadow-black/20 ring-1 ring-white/[0.02] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:shadow-cyan-950/25"
        >
          <article className="min-w-0">
            <EyecatchImage
              title={post.title}
              url={post.eyecatch.url}
              priority={index < 2}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
              imageClassName="transition duration-200 group-hover:brightness-110"
            />
            <div className="space-y-3.5 p-4 pb-5 sm:space-y-4 sm:p-5">
              <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-2 sm:gap-y-2">
                <time
                  className="shrink-0 text-xs tabular-nums text-slate-500"
                  dateTime={post.publishedAt}
                >
                  {post.publishedAt}
                </time>
                <div className="flex min-w-0 flex-wrap gap-2 sm:justify-end">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex max-w-full items-center break-words rounded-full border border-cyan-800/60 bg-cyan-950/40 px-2.5 py-1.5 text-left text-xs font-medium leading-snug text-cyan-300/95 [overflow-wrap:anywhere]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="break-words text-balance text-lg font-semibold leading-snug text-slate-100 transition group-hover:text-cyan-100">
                {post.title}
              </h3>
              <p className="line-clamp-2 break-words text-sm leading-relaxed text-slate-400 [overflow-wrap:anywhere]">
                {post.description}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
