import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * 管理画面用ミドルウェア
 *
 * - `ADMIN_SECRET_KEY` は `.env.local` / ホスティングの環境変数から Next.js が `process.env` に載せます（開発では `npm run dev` の再起動が必要な場合があります）。
 * - 初回のみ: URL に `?key=` があり、その値が `ADMIN_SECRET_KEY` と完全一致するとアクセス可 → HttpOnly Cookie を付与し、`key` を除いた URL へリダイレクト。
 * - 2 回目以降: 上記で付与した Cookie が一致すれば、`?key` なしで `/admin` にアクセス可。
 * - キーなし・不一致・環境変数未設定: `/` へリダイレクト。
 */

const COOKIE_NAME = "admin_auth_token"

function readAdminSecretKey(): string | undefined {
  const raw = process.env.ADMIN_SECRET_KEY
  if (raw === undefined || raw === null) return undefined
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/** Cookie に保存する値（平文のシークレットは保存しない） */
async function adminSessionToken(secret: string): Promise<string> {
  const data = new TextEncoder().encode(`${secret}:loglog-admin`)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/logout") {
    const res = NextResponse.redirect(new URL("/", request.url))
    res.cookies.delete(COOKIE_NAME)
    return res
  }

  const adminSecretKey = readAdminSecretKey()
  if (!adminSecretKey) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  const expectedCookie = await adminSessionToken(adminSecretKey)

  if (request.cookies.get(COOKIE_NAME)?.value === expectedCookie) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const keyFromQuery = url.searchParams.get("key")
  if (keyFromQuery === adminSecretKey) {
    url.searchParams.delete("key")
    const res = NextResponse.redirect(url)
    res.cookies.set(COOKIE_NAME, expectedCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return res
  }

  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
