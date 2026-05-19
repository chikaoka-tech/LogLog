"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const linkBase =
  "block rounded-md px-2 py-1.5 text-sm transition hover:bg-slate-800/80 hover:text-slate-100"
const linkActive = "bg-slate-800/90 text-slate-50"
const linkIdle = "text-slate-400"

export default function AdminNavLinks() {
  const pathname = usePathname()

  const postsActive =
    pathname === "/admin/posts" || (pathname.startsWith("/admin/posts/") && pathname !== "/admin/posts/new")
  const newActive = pathname === "/admin/posts/new"

  return (
    <div className="space-y-0.5">
      <Link href="/admin/posts" className={`${linkBase} ${postsActive ? linkActive : linkIdle}`}>
        Posts
      </Link>
      <Link
        href="/admin/posts/new"
        className={`${linkBase} pl-3 text-[13px] ${newActive ? linkActive : linkIdle}`}
      >
        New post
      </Link>
    </div>
  )
}
