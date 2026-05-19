import { isMasterTag } from "@/lib/tag-master"
import type { PostFormState, PostFormValues } from "@/app/admin/posts/form-types"

/** 送信された FormData からフォーム表示用の値を復元 */
export function parseFormValues(formData: FormData): PostFormValues {
  const statusRaw = String(formData.get("status") ?? "draft").trim()
  const tagsRaw = String(formData.get("tags") ?? "").trim()

  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    eyecatchUrl: String(formData.get("eyecatchUrl") ?? ""),
    content: String(formData.get("content") ?? ""),
    tags: tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    status: statusRaw === "published" ? "published" : "draft",
  }
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type ValidatedPost = {
  title: string
  slug: string
  description: string
  eyecatchUrl: string
  content: string
  tags: string[]
  published: boolean
}

function parseEyecatchUrl(raw: string): { url: string; error?: string } {
  const trimmed = raw.trim()
  if (!trimmed) return { url: "" }
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return { url: "", error: "画像 URL は http または https で指定してください。" }
    }
    if (trimmed.length > 2048) {
      return { url: "", error: "画像 URL は 2048 文字以内にしてください。" }
    }
    return { url: trimmed }
  } catch {
    return { url: "", error: "有効な画像 URL を入力してください。" }
  }
}

function parseTags(tagsRaw: string): { tags: string[]; error?: string } {
  if (!tagsRaw.trim()) return { tags: [] }
  const parts = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
  if (parts.some((t) => t.length > 64)) {
    return { tags: [], error: "各タグは 64 文字以内にしてください。" }
  }
  if (parts.some((t) => !isMasterTag(t))) {
    return { tags: [], error: "マスターにないタグが含まれています。一覧から選び直してください。" }
  }
  return { tags: parts }
}

export function validatePostForm(
  formData: FormData,
): { ok: true; data: ValidatedPost } | { ok: false; errors: NonNullable<PostFormState["errors"]> } {
  const title = String(formData.get("title") ?? "").trim()
  const slug = String(formData.get("slug") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const eyecatchRaw = String(formData.get("eyecatchUrl") ?? "").trim()
  const tagsRaw = String(formData.get("tags") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const status = String(formData.get("status") ?? "").trim()

  const errors: NonNullable<PostFormState["errors"]> = {}

  if (!title) errors.title = "タイトルを入力してください。"
  if (!slug) errors.slug = "スラッグを入力してください。"
  else if (!slugPattern.test(slug)) {
    errors.slug = "小文字の英数字とハイフンのみ使えます（例: my-post-title）。"
  }
  if (!description) errors.description = "説明を入力してください。"
  if (!content) errors.content = "本文を入力してください。"
  if (status !== "draft" && status !== "published") {
    errors.status = "ステータスを選択してください。"
  }

  const eyecatchResult = parseEyecatchUrl(eyecatchRaw)
  if (eyecatchResult.error) {
    errors.eyecatchUrl = eyecatchResult.error
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  const tagResult = parseTags(tagsRaw)
  if (tagResult.error) {
    return { ok: false, errors: { tags: tagResult.error } }
  }

  return {
    ok: true,
    data: {
      title,
      slug,
      description,
      eyecatchUrl: eyecatchResult.url,
      content,
      tags: tagResult.tags,
      published: status === "published",
    },
  }
}
