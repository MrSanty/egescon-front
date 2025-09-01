import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "react-hot-toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
})

export const metadata: Metadata = {
  title: "Egescon",
  description: "SaaS platform for managing your business contracts"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}
