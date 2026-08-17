# LogLog

日々の学習と実装を、あとから読み返せる形で残すための個人ブログです。

公開サイト: [https://log-log-iota.vercel.app](https://log-log-iota.vercel.app)

完成した解説を並べることより、つまずいたところやうまくいったところをメモとして公開することを目的にしています。フロントエンドを中心に、Next.js や TypeScript、設計の考え方を書いていきます。

## 工夫した点

- **公開と管理を分ける**  
  記事を読むのは誰でもできます。書く・直す・公開する操作は `/admin` だけに置き、ログインした自分だけが使います。

- **下書きは表に出さない**  
  管理画面では下書きも見えますが、トップや `/posts` には公開記事だけ出します。データベース側でも RLS を入れ、API から下書きが読めないようにしています。

- **認証は共有キーにしない**  
  URL に秘密のキーを付ける方式はやめ、Supabase Auth（メール＋パスワード）にしました。未ログインで `/admin` に来た人は `/login` へ送ります。

- **記事はファイルではなく DB で管理する**  
  公開中の記事は Prisma 経由で Supabase の PostgreSQL に保存します。Markdown のサンプル記事は公開一覧に混ぜません。

## 技術構成

| 層 | 採用 |
|----|------|
| フロント / サーバー | Next.js 16、React 19、Tailwind CSS |
| データ | Prisma、PostgreSQL（Supabase） |
| 認証 | Supabase Auth（`@supabase/ssr`） |
| ホスティング | Vercel |

## 画面

| パス | 内容 |
|------|------|
| `/` | トップ（公開記事） |
| `/posts` | 記事一覧・タグ絞り込み |
| `/about` | このサイトについて |
| `/login` | 管理画面ログイン |
| `/admin` | 記事の管理（要ログイン） |

## ローカル起動

```bash
npm install
```

`.env.example` をコピーして `.env.local` を作り、値を入れます。

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

## 環境変数

| 名前 | 用途 |
|------|------|
| `DATABASE_URL` | Prisma 用（Supabase のプール接続） |
| `DIRECT_URL` | `db:push` 用の直結 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public キー（`eyJ` で始まる） |

## データベース

```bash
npm run db:push
```

`posts` の RLS は `prisma/supabase-init.sql` を Supabase の SQL Editor で実行します。anon / authenticated は公開記事の読み取りのみ許可し、書き込みは Prisma（管理画面）経由です。

## 認証

- 管理者ユーザーは Supabase の Authentication で作成
- 公開登録（Allow new users to sign up）はオフ
- 未ログインの `/admin` アクセスは `/login` へリダイレクト

## デプロイ

GitHub 連携の Vercel にデプロイしています。本番にも上記の環境変数を設定します。

Supabase → Authentication → URL Configuration:

- Site URL: 本番ドメイン（`/login` は付けない）
- Redirect URLs: `http://localhost:3000/**` と本番 URL
