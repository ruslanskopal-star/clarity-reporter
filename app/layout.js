// layout_v2.js - CRO Report title, bez globals.css
export const metadata = {
  title: 'CRO Report',
  description: 'AI CRO analyza podle metodologie ESHOP BOOSTER',
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
