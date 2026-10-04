"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname === "/editor") {
    return <main className="studio-app-main">{children}</main>;
  }

  return (
    <>
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
    </>
  );
}
