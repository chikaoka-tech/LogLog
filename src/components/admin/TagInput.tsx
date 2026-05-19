"use client"

import { useId, useMemo, useState } from "react"
import { TAG_MASTER, filterMasterTags } from "@/lib/tag-master"

type TagInputProps = {
  name?: string
  defaultTags?: string[]
  error?: string
  labelClassName?: string
}

export default function TagInput({
  name = "tags",
  defaultTags = [],
  error,
  labelClassName = "text-xs font-medium text-slate-400",
}: TagInputProps) {
  const fieldId = useId()
  const [selected, setSelected] = useState<string[]>(() => filterMasterTags(defaultTags))

  const available = useMemo(
    () => TAG_MASTER.filter((tag) => !selected.includes(tag)),
    [selected],
  )

  const addTag = (tag: string) => {
    if (!selected.includes(tag)) {
      setSelected((prev) => [...prev, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelected((prev) => prev.filter((t) => t !== tag))
  }

  const panelClass = error
    ? "border-rose-500/80 ring-rose-500/20"
    : "border-slate-700/90 ring-cyan-500/20"

  return (
    <div>
      <label htmlFor={`${fieldId}-select`} className={labelClassName}>
        Tags
      </label>
      <input type="hidden" name={name} value={selected.join(",")} readOnly />

      {selected.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="選択済みタグ">
          {selected.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-800/60 bg-cyan-950/50 py-0.5 pl-2.5 pr-1 text-xs font-medium text-cyan-100">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full text-cyan-300/80 transition hover:bg-cyan-900/60 hover:text-cyan-50"
                  aria-label={`${tag} の選択を解除`}
                >
                  <span aria-hidden>✕</span>
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1.5 text-[11px] text-slate-600">下の一覧またはプルダウンからタグを選んでください。</p>
      )}

      <div
        className={`mt-3 rounded-md border bg-[#161b22] p-3 shadow-inner shadow-black/20 focus-within:ring-2 ${panelClass}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      >
        <label htmlFor={`${fieldId}-select`} className="sr-only">
          タグを追加
        </label>
        <select
          id={`${fieldId}-select`}
          value=""
          disabled={available.length === 0}
          onChange={(e) => {
            const value = e.target.value
            if (value) addTag(value)
          }}
          className="w-full rounded-md border border-slate-700/90 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-600/50 focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            {available.length === 0 ? "選択できるタグはありません" : "タグを選択…"}
          </option>
          {available.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {available.length > 0 ? (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              またはクリックで追加
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="未選択のタグ">
              {available.map((tag) => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => addTag(tag)}
                    className="inline-flex items-center rounded-full border border-dashed border-slate-600/80 bg-slate-800/40 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-cyan-700/60 hover:bg-cyan-950/30 hover:text-cyan-100"
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : selected.length > 0 ? (
          <p className="mt-2 text-[11px] text-slate-600">すべてのタグが選択済みです。✕ で解除すると再び選べます。</p>
        ) : null}
      </div>

      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-rose-400/95">
          {error}
        </p>
      ) : null}
    </div>
  )
}
