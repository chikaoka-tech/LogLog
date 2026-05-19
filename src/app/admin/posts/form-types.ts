export type PostFormValues = {
  title: string
  slug: string
  description: string
  eyecatchUrl: string
  content: string
  tags: string[]
  status: "draft" | "published"
}

export type PostFormState = {
  errors?: Partial<
    Record<"title" | "slug" | "description" | "eyecatchUrl" | "tags" | "content" | "status", string>
  >
  message?: string
  /** バリデーションエラー時にフォームへ戻す入力値 */
  values?: PostFormValues
}

export const initialPostFormState: PostFormState = {}

export type DeletePostState = {
  error?: string
  success?: boolean
}

/** @deprecated use PostFormState */
export type CreatePostFormState = PostFormState

/** @deprecated use initialPostFormState */
export const initialCreatePostFormState = initialPostFormState
