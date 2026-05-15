import type { Blog } from "@/types/blog"

function eyecatchFromSeed(seed: string): Blog["eyecatch"] {
  return {
    url: `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/630`,
    width: 1200,
    height: 630,
  }
}

export const blogPosts: Blog[] = [
  {
    id: "1",
    title: "React Server Componentsの境界設計メモ",
    description:
      "描画責務を分離して、体感速度と保守性を両立させるための判断基準を整理しました。",
    content: `
<p>Server Components と Client Components の境界は、体感速度と保守性の両方に効いてきます。ここでは日々の実装で使っている判断基準を短くまとめます。</p>
<h2>まず「どこで状態を持つか」</h2>
<p>インタラクションが必要ならクライアントへ寄せる。データ取得やレイアウトの大部分はサーバーに置く。迷ったら<strong>状態の寿命</strong>で切ると決めやすいです。</p>
<h2>境界を太くしない</h2>
<p>Props の型が膨らみ、境界ファイルだけが複雑になるパターンは要注意です。モジュールの責務を小さく保ち、<code>use client</code> は本当に必要な葉に寄せるのがコツです。</p>
<ul>
<li>フォーム・トースト・アニメーションはクライアント</li>
<li>一覧の骨格・メタ情報はサーバー</li>
</ul>
<blockquote><p>「境界は少ないほど良い」ではなく、「境界は明確であるほど良い」。</p></blockquote>
<p>チームで合意したルールを README に一行でも残しておくと、レビューが速くなります。</p>
`,
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-28",
    eyecatch: eyecatchFromSeed("rsc-1"),
    tags: ["Frontend", "React"],
  },
  {
    id: "2",
    title: "Node.js APIのエラーハンドリング標準化",
    description:
      "例外の分類とレスポンス設計を揃えて、運用時の調査コストを下げる方法を紹介します。",
    content: `
<p>運用で一番つらいのは「同じ 500 なのに中身がバラバラ」です。例外を分類し、レスポンス形を揃えると調査が速くなります。</p>
<h2>例外の型を三つに分ける</h2>
<p>入力不正、認可、想定外。ログに残す粒度と HTTP ステータスを対応させます。</p>
<h2>レスポンスは機械可読に</h2>
<p><code>code</code>、<code>message</code>、必要なら <code>details</code>。フロントも監視も同じ形を見られるようにします。</p>
`,
    publishedAt: "2026-04-24",
    updatedAt: "2026-04-25",
    eyecatch: eyecatchFromSeed("api-err-2"),
    tags: ["Backend", "Node.js"],
  },
  {
    id: "3",
    title: "E2Eテストを壊れにくくする待機戦略",
    description:
      "flakyを減らすために、UI状態に合わせて待つ実装パターンを具体例付きでまとめます。",
    content: `
<p>固定の <code>sleep</code> は避け、UI の状態に同期する待機へ寄せるのが基本です。</p>
<h2>推奨する待ち方</h2>
<ol>
<li>ロールやラベルで要素が現れるまで</li>
<li>ネットワークが落ち着くまで（必要なら route 待ち）</li>
<li>アニメーション完了を考慮（過剰に待たない）</li>
</ol>
<p>テストが読み物として意味を持つと、壊れたときの原因当たりが速くなります。</p>
`,
    publishedAt: "2026-04-19",
    updatedAt: "2026-04-19",
    eyecatch: eyecatchFromSeed("e2e-3"),
    tags: ["Testing"],
  },
  {
    id: "4",
    title: "Docker開発環境を軽く保つキャッシュ設計",
    description:
      "ビルド時間を短縮しながら、チーム全体で再現性を維持する構成のポイントを解説します。",
    content: `
<p>キャッシュ層を誤ると、毎回フルビルドになって開発体験が落ちます。依存関係のコピー順とレイヤ分割を意識します。</p>
<h2>レイヤのコツ</h2>
<p>変更頻度が低いファイルほど上（早い段階）に置く。ロックファイルとパッケージ定義を先にコピーして <code>npm ci</code> まで済ませるのが定石です。</p>
`,
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-14",
    eyecatch: eyecatchFromSeed("dock-4"),
    tags: ["Infra", "Docker"],
  },
  {
    id: "5",
    title: "コードレビューで伝わるコメントの書き方",
    description:
      "指摘の意図と背景を短く明確に伝えて、議論を前向きに進めるコツを共有します。",
    content: `
<p>レビューコメントは「何を」「なぜ」が短く書けているかが大事です。代替案があるなら一行添えると建設的になります。</p>
<h2>テンプレの例</h2>
<ul>
<li>懸念: …（ユーザー影響 / 保守性 / セキュリティ）</li>
<li>提案: …（具体パッチでも可）</li>
</ul>
`,
    publishedAt: "2026-04-09",
    updatedAt: "2026-04-09",
    eyecatch: eyecatchFromSeed("cr-5"),
    tags: ["Career"],
  },
  {
    id: "6",
    title: "日々の実装で使うAI補助の定着パターン",
    description:
      "プロンプトの型をチームで共有し、品質を落とさず速度を上げる運用例をまとめました。",
    content: `
<p>プロンプトに「前提・制約・出力形式」を毎回入れる型を用意しておくと、ブレが減ります。</p>
<h2>定着のコツ</h2>
<p>うまくいった例をスニペット化し、レビュー観点（セキュリティ・テスト）をチェックリストにする。速度だけ取りに行かない運用が続きます。</p>
`,
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-05",
    eyecatch: eyecatchFromSeed("ai-6"),
    tags: ["AI Tools", "Productivity"],
  },
]

export function getPostById(id: string): Blog | undefined {
  return blogPosts.find((p) => p.id === id)
}

/** 全記事から重複のないタグ一覧（日本語ロケールでソート） */
export function getAllTags(): string[] {
  const seen = new Set<string>()
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      seen.add(tag)
    }
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b, "ja"))
}

/** 指定タグを含む記事のみ。空文字・空白のみのときは全件 */
export function getFilteredPosts(tag: string): Blog[] {
  const t = tag.trim()
  if (!t) return [...blogPosts]
  return blogPosts.filter((post) => post.tags.includes(t))
}
