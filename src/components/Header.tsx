"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const

export default function Header() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-100 transition hover:text-cyan-400 sm:text-xl"
        >
          LogLog
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {nav.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      active
                        ? "rounded-full bg-cyan-500/15 px-3 py-2 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30 sm:px-4"
                        : "rounded-full px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800/80 hover:text-slate-200 sm:px-4"
                    }
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
