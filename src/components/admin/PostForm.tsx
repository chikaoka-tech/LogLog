"use client"

import { useActionState } from "react"
import Link from "next/link"
import { createPostAction, updatePostAction } from "@/app/admin/posts/actions"
import { initialPostFormState, type PostFormState, type PostFormValues } from "@/app/admin/posts/form-types"
import TagInput from "@/components/admin/TagInput"
import StatusToggle from "@/components/admin/StatusToggle"

type PostFormProps = {
  mode?: "create" | "edit"
  postId?: string
  defaultValues?: Partial<PostFormValues>
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-rose-400/95">{message}</p>
}

function fieldClass(hasError: boolean) {
  const base =
    "mt-1.5 w-full min-w-0 rounded-md border bg-[#161b22] px-3 py-2 text-sm text-slate-100 shadow-inner shadow-black/20 outline-none ring-0 transition placeholder:text-slate-600 focus:ring-2"
  if (hasError) {
    return `${base} border-rose-500/80 focus:border-rose-500/80 focus:ring-rose-500/20`
  }
  return `${base} border-slate-700/90 focus:border-cyan-600/50 focus:ring-cyan-500/20`
}

const labelClass = "text-xs font-medium text-slate-400"

function mergeValues(
  defaults?: Partial<PostFormValues>,
  fromState?: PostFormValues,
): PostFormValues {
  return {
    title: fromState?.title ?? defaults?.title ?? "",
    slug: fromState?.slug ?? defaults?.slug ?? "",
    description: fromState?.description ?? defaults?.description ?? "",
    eyecatchUrl: fromState?.eyecatchUrl ?? defaults?.eyecatchUrl ?? "",
    content: fromState?.content ?? defaults?.content ?? "",
    tags: fromState?.tags ?? defaults?.tags ?? [],
    status: fromState?.status ?? defaults?.status ?? "draft",
  }
}

export default function PostForm({ mode = "create", postId, defaultValues }: PostFormProps) {
  const action = mode === "edit" ? updatePostAction : createPostAction
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(
    action,
    initialPostFormState,
  )

  const isEdit = mode === "edit"
  const values = mergeValues(defaultValues, state.values)
  const formKey = state.values ? `retry-${values.slug}-${values.title.length}` : `init-${postId ?? "new"}`

  return (
    <form key={formKey} action={formAction} className="max-w-3xl space-y-6" noValidate>
      {isEdit && postId ? <input type="hidden" name="postId" value={postId} /> : null}

      <StatusToggle
        defaultValue={values.status}
        error={state.errors?.status}
      />

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          defaultValue={values.title}
          className={fieldClass(!!state.errors?.title)}
          aria-invalid={state.errors?.title ? true : undefined}
        />
        <FieldError message={state.errors?.title} />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          autoComplete="off"
          spellCheck={false}
          defaultValue={values.slug}
          className={`${fieldClass(!!state.errors?.slug)} font-mono text-[13px]`}
          placeholder="e.g. react-server-components-notes"
          aria-invalid={state.errors?.slug ? true : undefined}
        />
        <p className="mt-1 text-[11px] text-slate-600">URL path segment. Lowercase, numbers, hyphens only.</p>
        <FieldError message={state.errors?.slug} />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={values.description}
          className={`${fieldClass(!!state.errors?.description)} resize-y`}
          aria-invalid={state.errors?.description ? true : undefined}
        />
        <FieldError message={state.errors?.description} />
      </div>

      <div>
        <label htmlFor="eyecatchUrl" className={labelClass}>
          アイキャッチ画像 URL
        </label>
        <input
          id="eyecatchUrl"
          name="eyecatchUrl"
          type="url"
          inputMode="url"
          autoComplete="off"
          defaultValue={values.eyecatchUrl}
          placeholder="https://example.com/images/cover.jpg"
          className={fieldClass(!!state.errors?.eyecatchUrl)}
          aria-invalid={state.errors?.eyecatchUrl ? true : undefined}
        />
        <p className="mt-1 text-[11px] text-slate-600">
          一覧・記事上部のサムネイル（1200×630 推奨）。空欄のときは slug から自動画像を使います。
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          本文中の画像は Markdown で{" "}
          <code className="rounded bg-slate-800/80 px-1 text-cyan-200/90">![説明](https://...)</code>{" "}
          と書けます。
        </p>
        <FieldError message={state.errors?.eyecatchUrl} />
        {values.eyecatchUrl.trim() ? (
          <div className="mt-3 overflow-hidden rounded-lg border border-slate-700/80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={values.eyecatchUrl.trim()}
              alt="プレビュー"
              className="aspect-[1200/630] w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      <TagInput
        key={`tags-${formKey}`}
        defaultTags={values.tags}
        error={state.errors?.tags}
        labelClassName={labelClass}
      />

      <div>
        <label htmlFor="content" className={labelClass}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={values.content}
          className={`${fieldClass(!!state.errors?.content)} resize-y font-mono text-[13px] leading-relaxed`}
          spellCheck={false}
          aria-invalid={state.errors?.content ? true : undefined}
        />
        <FieldError message={state.errors?.content} />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-800/90 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-9 items-center justify-center rounded-md border border-cyan-700/60 bg-cyan-950/50 px-4 text-sm font-medium text-cyan-100 shadow-sm transition hover:bg-cyan-900/40 disabled:pointer-events-none disabled:opacity-50"
        >
          {pending ? "保存中..." : isEdit ? "更新" : "作成"}
        </button>
        <Link
          href="/admin/posts"
          className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-slate-500 transition hover:text-slate-300"
        >
          キャンセル
        </Link>
      </div>
    </form>
  )
}
