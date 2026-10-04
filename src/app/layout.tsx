import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creation — ideyanı geyin",
  description: "Öz ideyanı t-shirt dizaynına çevir. Mətn, şəkil və sənin yaradıcılığın üçün şəxsi dizayn studiyası.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az">
      <body>
        <header className="header">
          <Link className="brand" href="/" aria-label="Creation ana səhifə">creation<span aria-hidden="true">✳</span></Link>
          <nav aria-label="Əsas naviqasiya">
            <Link className="nav-products" href="/products">Məhsullar</Link>
            <Link className="nav-studio" href="/editor">Studiyanı aç <span aria-hidden="true">↗</span></Link>
          </nav>
        </header>
        <main className="app-main">{children}</main>
        <footer className="footer">
          <Link className="footer-brand" href="/">creation<span aria-hidden="true">✳</span></Link>
          <p>Sənin ideyan. Sənin imzan.</p>
          <span className="footer-status"><i aria-hidden="true" />İlkin prototip · satış aktiv deyil</span>
        </footer>
      </body>
    </html>
  );
}

