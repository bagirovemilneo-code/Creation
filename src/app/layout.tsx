import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creation — ideyanı geyin",
  description: "Fərdi dizaynlı məhsullar üçün yaradıcı platforma.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="az"><body>
    <header className="header"><Link className="brand" href="/">creation<span>®</span></Link>
      <nav aria-label="Əsas naviqasiya"><Link href="/products">Məhsullar</Link><Link href="/editor">Studiya ↗</Link></nav>
    </header>
    <main>{children}</main>
    <footer>İdeyadan məhsula. <span>İlkin prototip · 01</span></footer>
  </body></html>;
}

