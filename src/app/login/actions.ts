"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/login?error=1")
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error("login:", error.message)
    redirect("/login?error=1")
  }

  revalidatePath("/", "layout")
  redirect("/admin")
}

export async function logout() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // セッション切れでもログイン画面へ戻す
  }
  redirect("/login")
}
