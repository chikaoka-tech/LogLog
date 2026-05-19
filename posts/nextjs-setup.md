---
title: "Next.jsとTypeScriptでの環境構築"
date: "2026-05-19"
slug: "nextjs-setup"
tags: ["Next.js", "TypeScript"]
excerpt: "Next.jsの最新機能を使った環境構築手順について解説します。"
---

# ここから本文

Next.jsの環境構築は非常にシンプルです。`create-next-app` を使えば、TypeScript・ESLint・Tailwind CSS を含むプロジェクトを数分で立ち上げられます。

## プロジェクトの作成

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
```

対話形式のプロンプトに従い、App Router を選ぶのがおすすめです。

## ディレクトリ構成の要点

| パス | 役割 |
|------|------|
| `app/` | ルーティングとページ |
| `public/` | 静的アセット |
| `next.config.ts` | Next.js の設定 |

## まとめ

- TypeScript は最初から有効にしておく
- App Router でサーバーコンポーネントを活用する
- 環境変数は `.env.local` に置く

これでローカル開発の土台は整います。次はデプロイ先（Vercel など）を決めましょう。
