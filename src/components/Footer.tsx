export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
        <p className="text-sm text-slate-500">© {year} LogLog. All rights reserved.</p>
      </div>
    </footer>
  )
}
