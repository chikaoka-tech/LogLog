import { config } from "dotenv"
import { resolve } from "path"
import { defineConfig } from "prisma/config"

// Next.js は .env.local、Prisma CLI は .env を参照するため両方を読み込む
config({ path: resolve(process.cwd(), ".env.local") })
config({ path: resolve(process.cwd(), ".env") })

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLI（db push 等）は Direct connection を優先（プーラー :6543 では DDL が失敗・ハングしやすい）
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
})
