import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"

export default function Home() {
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
                <a className="transition hover:text-cyan-300" href="#">
                  Home
                </a>
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

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400/80">Engineer Blog</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">Latest Articles</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-700 hover:shadow-cyan-950/40"
            >
              <article>
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/60 text-sm font-medium tracking-wide text-cyan-200/70">
                  Dummy Image
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="rounded-full border border-cyan-800 bg-cyan-950/50 px-2.5 py-1 font-medium text-cyan-300">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-slate-100">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{post.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
