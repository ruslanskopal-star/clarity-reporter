export const metadata = { title: "Clarity Reporter" }
export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
