import type { Metadata } from "next"
import { login } from "./actions"

export const metadata: Metadata = {
  title: "ログイン",
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-xl font-semibold text-slate-100">管理画面ログイン</h1>

      <form action={login} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          メールアドレス
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-300">
          パスワード
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
          />
        </label>

        {error ? (
          <p className="text-sm text-rose-400">メールまたはパスワードが違います</p>
        ) : null}

        <button
          type="submit"
          className="rounded bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
