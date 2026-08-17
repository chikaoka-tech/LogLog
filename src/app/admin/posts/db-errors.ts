import { Prisma } from "@/src/generated/prisma/client"

/** Prisma エラーをフォーム用メッセージに変換 */
export function postActionErrorMessage(error: unknown): string | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021") {
      return (
        "データベースに posts テーブルがありません。" +
        "ターミナルで npm run db:push を実行するか、" +
        "Supabase の SQL Editor で prisma/supabase-init.sql を実行してください。"
      )
    }
    if (error.code === "P2002") {
      return "このスラッグは既に使われています。"
    }
    if (error.code === "P2025") {
      return "更新対象の記事が見つかりません。ページを再読み込みしてから、もう一度お試しください。"
    }
  }

  // 接続まわりの失敗を利用者に分かる文面で返す
  if (error instanceof Error) {
    const message = error.message
    if (
      message.includes("ENOTFOUND") ||
      message.includes("ECONNREFUSED") ||
      message.includes("Can't reach database server")
    ) {
      return "データベースに接続できません。接続設定を確認して、少し待ってから再試行してください。"
    }
    if (message.includes("Authentication failed") || message.includes("password authentication failed")) {
      return "データベース認証に失敗しました。環境変数の接続情報を確認してください。"
    }
  }
  return null
}
