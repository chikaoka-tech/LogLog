import Link from "next/link"
import type { Blog } from "@/types/blog"
import { blogPosts } from "@/lib/posts"

type PostListProps = {
  posts?: Blog[]
}

export default function PostList({ posts = blogPosts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className="group block overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/40 shadow-sm shadow-black/20 ring-1 ring-white/[0.02] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:shadow-cyan-950/25"
        >
          <article>
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/50 text-xs font-medium uppercase tracking-widest text-cyan-200/60 transition group-hover:text-cyan-200/90 sm:h-44">
              Preview
            </div>
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-800/60 bg-cyan-950/40 px-2.5 py-0.5 font-medium text-cyan-300/95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold leading-snug text-slate-100 transition group-hover:text-cyan-100">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">{post.description}</p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
