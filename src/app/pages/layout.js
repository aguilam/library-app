import Header from '../components/header';
import Footer from '../components/footer';
import "../globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header />
      <main>{children}</main>
      <Footer />
      </body>
    </html>
  )
}
