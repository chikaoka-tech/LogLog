import type { Metadata } from "next"
import Link from "next/link"
import AdminNavLinks from "@/components/admin/AdminNavLinks"

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin | LogLog" },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-800/90 bg-[#0d1117] text-slate-200">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1600px] min-w-0">
        <aside className="sticky top-14 z-40 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 self-start border-r border-slate-800/90 py-6 pl-4 pr-3 lg:block">
          <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Administration
          </p>
          <nav className="mt-3" aria-label="Admin">
            <AdminNavLinks />
          </nav>
          <div className="mt-8 space-y-3 border-t border-slate-800/80 px-2 pt-6">
            <Link
              href="/admin/logout"
              className="block text-xs text-slate-500 transition hover:text-rose-400/90"
            >
              Log out
            </Link>
            <Link
              href="/"
              className="block text-xs text-slate-500 transition hover:text-cyan-400/90"
            >
              ← Back to site
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <p className="mb-4 lg:hidden">
            <Link href="/admin/logout" className="text-xs text-slate-500 hover:text-rose-400/90">
              Log out
            </Link>
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
