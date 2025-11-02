// ... imports ...
import { Providers } from "@/components/providers" // Providers terimport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers> {/* Providers (yang berisi PannaProvider) membungkus children */}
          {children}
        </Providers>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}