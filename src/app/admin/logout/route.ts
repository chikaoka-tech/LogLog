import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function GET() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // 環境変数未設定でもログアウト画面へ戻す
  }
  redirect("/login")
}
