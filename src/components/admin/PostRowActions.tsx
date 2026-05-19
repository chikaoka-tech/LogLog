"use client"

import { useState } from "react"
import Link from "next/link"
import DeletePostModal from "@/components/admin/DeletePostModal"

type PostRowActionsProps = {
  postId: string
  postTitle: string
  slug: string
  isPublished?: boolean
}

export default function PostRowActions({
  postId,
  postTitle,
  slug,
  isPublished = false,
}: PostRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-1.5">
        <Link
          href={`/admin/posts/${postId}/edit`}
          className="inline-flex h-7 items-center justify-center rounded-md border border-slate-600/80 bg-slate-800/60 px-2.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700/80"
        >
          編集
        </Link>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="inline-flex h-7 items-center justify-center rounded-md border border-rose-900/50 bg-rose-950/30 px-2.5 text-xs font-medium text-rose-300/95 transition hover:bg-rose-900/40 hover:text-rose-200"
        >
          削除
        </button>
        {isPublished ? (
          <Link
            href={`/posts/${slug}`}
            className="inline-flex h-7 items-center justify-center px-1.5 text-xs font-medium text-cyan-500/90 hover:text-cyan-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </Link>
        ) : null}
      </div>
      <DeletePostModal
        open={deleteOpen}
        postId={postId}
        postTitle={postTitle}
        onClose={() => setDeleteOpen(false)}
      />
    </>
  )
}
