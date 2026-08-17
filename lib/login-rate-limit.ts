import { cookies } from "next/headers"

const COOKIE_NAME = "ll_login_fail"
const FAIL_LIMIT = 5
const WINDOW_MS = 15 * 60 * 1000

type FailState = {
  count: number
  resetAt: number
}

function parseState(raw: string | undefined): FailState | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as FailState
    if (typeof parsed.count !== "number" || typeof parsed.resetAt !== "number") return null
    return parsed
  } catch {
    return null
  }
}

export async function isLoginLocked(): Promise<boolean> {
  const store = await cookies()
  const state = parseState(store.get(COOKIE_NAME)?.value)
  if (!state) return false
  if (Date.now() > state.resetAt) return false
  return state.count >= FAIL_LIMIT
}

export async function recordLoginFailure(): Promise<boolean> {
  const store = await cookies()
  const now = Date.now()
  const current = parseState(store.get(COOKIE_NAME)?.value)
  const resetAt = current && now <= current.resetAt ? current.resetAt : now + WINDOW_MS
  const count = current && now <= current.resetAt ? current.count + 1 : 1

  store.set(COOKIE_NAME, JSON.stringify({ count, resetAt }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.ceil(WINDOW_MS / 1000),
  })

  return count >= FAIL_LIMIT
}

export async function clearLoginFailures(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
