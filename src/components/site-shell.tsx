"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BrandLogo } from "./brand-logo";
import { UiIcon } from "./ui-icon";

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname === "/editor") {
    return <main className="studio-app-main">{children}</main>;
  }

  return (
    <>
      <header className="header">
        <Link className="brand" href="/" aria-label="Creation ana səhifə"><BrandLogo /></Link>
        <nav aria-label="Əsas naviqasiya">
          <Link className="nav-products" href="/products" aria-current={pathname === "/products" ? "page" : undefined}>Məhsullar</Link>
          <Link className="nav-studio" href="/editor?product=classic-tshirt">Studiya <UiIcon name="arrow" /></Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="footer">
        <Link className="footer-brand" href="/" aria-label="Creation ana səhifə"><BrandLogo /></Link>
        <span className="footer-status">Dizayn prototipi · sifariş hələ aktiv deyil</span>
      </footer>
    </>
  );
}
