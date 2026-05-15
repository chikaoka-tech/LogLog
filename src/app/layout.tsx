import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { default: "LogLog", template: "%s | LogLog" },
  description: "エンジニアの学びと実装メモを綴るテックブログ。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip bg-slate-950 font-sans text-slate-200 antialiased">
        <Header />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
