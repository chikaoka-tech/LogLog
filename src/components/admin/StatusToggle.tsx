"use client"

type PostStatus = "draft" | "published"

type StatusToggleProps = {
  name?: string
  defaultValue?: PostStatus
  error?: string
}

export default function StatusToggle({
  name = "status",
  defaultValue = "draft",
  error,
}: StatusToggleProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-medium text-slate-400">ステータス</legend>
      <div
        className="inline-flex rounded-lg border border-slate-700/90 bg-[#161b22] p-0.5 shadow-inner shadow-black/20"
        role="radiogroup"
        aria-invalid={error ? true : undefined}
      >
        <label className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value="draft"
            defaultChecked={defaultValue === "draft"}
            className="peer sr-only"
          />
          <span className="inline-flex h-8 items-center rounded-md px-3.5 text-xs font-medium text-slate-400 transition peer-checked:bg-slate-700/90 peer-checked:text-slate-100 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/30">
            下書き（Draft）
          </span>
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value="published"
            defaultChecked={defaultValue === "published"}
            className="peer sr-only"
          />
          <span className="inline-flex h-8 items-center rounded-md px-3.5 text-xs font-medium text-slate-400 transition peer-checked:bg-emerald-900/50 peer-checked:text-emerald-100 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/30">
            公開（Published）
          </span>
        </label>
      </div>
      {error ? <p className="text-xs text-rose-400/95">{error}</p> : null}
    </fieldset>
  )
}
