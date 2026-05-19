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
  }
  return null
}
