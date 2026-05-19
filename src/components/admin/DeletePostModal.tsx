"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deletePostAction } from "@/app/admin/posts/actions"

type DeletePostModalProps = {
  open: boolean
  postId: string
  postTitle: string
  onClose: () => void
}

export default function DeletePostModal({ open, postId, postTitle, onClose }: DeletePostModalProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setError(null)
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deletePostAction(postId)
      if (result.error) {
        setError(result.error)
        return
      }
      onClose()
      router.refresh()
    })
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto w-[min(100%,24rem)] max-w-md rounded-lg border border-slate-700/90 bg-[#161b22] p-0 text-slate-200 shadow-xl shadow-black/50 backdrop:bg-black/60"
    >
      <div className="p-5">
        <h2 className="text-base font-semibold text-slate-100">記事の削除</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">本当にこの記事を削除しますか？</p>
        <p className="mt-2 rounded-md border border-slate-800/90 bg-slate-900/50 px-2.5 py-2 text-sm font-medium text-slate-200">
          {postTitle}
        </p>
        {error ? <p className="mt-2 text-xs text-rose-400/95">{error}</p> : null}
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="inline-flex h-9 items-center justify-center rounded-md border border-slate-600/80 px-3.5 text-sm text-slate-300 transition hover:bg-slate-800/80 disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={pending}
            className="inline-flex h-9 items-center justify-center rounded-md border border-rose-800/70 bg-rose-950/50 px-3.5 text-sm font-medium text-rose-100 transition hover:bg-rose-900/50 disabled:opacity-50"
          >
            {pending ? "削除中..." : "削除する"}
          </button>
        </div>
      </div>
    </dialog>
  )
}
