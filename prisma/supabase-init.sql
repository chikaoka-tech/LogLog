-- Supabase SQL Editor で実行するか、DIRECT_URL を設定して npm run db:push を使ってください。

CREATE TABLE IF NOT EXISTS "posts" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "eyecatchUrl" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_key" ON "posts"("slug");

-- ---------------------------------------------------------------------------
-- Row Level Security（公開前に必須）
-- Prisma（DATABASE_URL）は管理者接続のため RLS を回避して全件扱える。
-- anon / authenticated の REST API は「公開記事の読み取り」だけ許可する。
-- ---------------------------------------------------------------------------
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published posts" ON "posts";

CREATE POLICY "Public can read published posts"
ON "posts"
FOR SELECT
TO anon, authenticated
USING ("published" = true);

-- INSERT / UPDATE / DELETE のポリシーは作らない
-- → REST API からの書き込みは拒否（管理画面の Prisma 経由だけ書き込める）
