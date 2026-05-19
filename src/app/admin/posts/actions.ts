"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { DeletePostState, PostFormState } from "@/app/admin/posts/form-types"
import { postActionErrorMessage } from "@/app/admin/posts/db-errors"
import { parseFormValues, validatePostForm } from "@/app/admin/posts/validate-post-form"
import {
  createPost,
  deletePost,
  getAdminPostById,
  isSlugTaken,
  updatePost,
} from "@/lib/post-service"

function revalidatePostPaths(slug: string) {
  revalidatePath("/admin/posts")
  revalidatePath("/posts")
  revalidatePath(`/posts/${slug}`)
  revalidatePath("/")
}

function withValues(formData: FormData, state: Omit<PostFormState, "values">): PostFormState {
  return { ...state, values: parseFormValues(formData) }
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const validation = validatePostForm(formData)
  if (!validation.ok) {
    return withValues(formData, { errors: validation.errors })
  }

  const { data } = validation

  if (await isSlugTaken(data.slug)) {
    return withValues(formData, { errors: { slug: "このスラッグは既に使われています。" } })
  }

  try {
    await createPost(data)
    revalidatePostPaths(data.slug)
    redirect("/admin/posts")
  } catch (error) {
    const message = postActionErrorMessage(error)
    if (message) {
      const field = message.includes("スラッグ") ? "slug" : "title"
      return withValues(formData, { errors: { [field]: message } })
    }
    console.error("createPostAction:", error)
    return withValues(formData, {
      errors: { title: "保存に失敗しました。しばらくしてから再度お試しください。" },
    })
  }
}

export async function updatePostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const postId = String(formData.get("postId") ?? "").trim()
  if (!postId) {
    return withValues(formData, { errors: { title: "記事 ID が不正です。" } })
  }

  const existing = await getAdminPostById(postId)
  if (!existing) {
    return withValues(formData, { errors: { title: "記事が見つかりません。" } })
  }

  const validation = validatePostForm(formData)
  if (!validation.ok) {
    return withValues(formData, { errors: validation.errors })
  }

  const { data } = validation

  if (await isSlugTaken(data.slug, postId)) {
    return withValues(formData, { errors: { slug: "このスラッグは既に使われています。" } })
  }

  try {
    await updatePost(postId, data)
    revalidatePostPaths(data.slug)
    if (existing.slug !== data.slug) {
      revalidatePath(`/posts/${existing.slug}`)
    }
    redirect("/admin/posts")
  } catch (error) {
    const message = postActionErrorMessage(error)
    if (message) {
      const field = message.includes("スラッグ") ? "slug" : "title"
      return withValues(formData, { errors: { [field]: message } })
    }
    console.error("updatePostAction:", error)
    return withValues(formData, {
      errors: { title: "更新に失敗しました。しばらくしてから再度お試しください。" },
    })
  }
}

export async function deletePostAction(postId: string): Promise<DeletePostState> {
  const id = postId.trim()
  if (!id) return { error: "記事 ID が不正です。" }

  const existing = await getAdminPostById(id)
  if (!existing) return { error: "記事が見つかりません。" }

  try {
    await deletePost(id)
    revalidatePostPaths(existing.slug)
    return { success: true }
  } catch (error) {
    const message = postActionErrorMessage(error)
    if (message) return { error: message }
    console.error("deletePostAction:", error)
    return { error: "削除に失敗しました。しばらくしてから再度お試しください。" }
  }
}
