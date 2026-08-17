import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { login } from "./actions"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "ログイン",
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    redirect("/admin")
  }

  const { error } = await searchParams

  return (
    <div className="relative min-w-0 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/90">Admin</p>
        <h1 className="mt-3 mb-8 text-2xl font-semibold tracking-tight text-slate-50">管理画面ログイン</h1>

        <form
          action={login}
          className="flex flex-col gap-4 rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 shadow-xl shadow-black/20 ring-1 ring-white/[0.03]"
        >
          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            メールアドレス
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-slate-300">
            パスワード
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          {error === "locked" ? (
            <p className="text-sm text-rose-400">試行回数が多すぎます。15分ほど待ってから再度お試しください。</p>
          ) : error ? (
            <p className="text-sm text-rose-400">メールまたはパスワードが違います</p>
          ) : null}

          <button
            type="submit"
            className="mt-1 rounded-full bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  )
}
