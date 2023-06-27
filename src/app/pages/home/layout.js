export default function RootLayout({ children }) {
  return (
      <body>
        <header>
          <h1>Лево</h1>
        </header>
        <main>{children}</main>
      </body>
  )
}
