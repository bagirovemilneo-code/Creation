"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { BrandLogo } from "./brand-logo";
import { UiIcon } from "./ui-icon";

export function SiteShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isEditor = pathname === "/editor";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isEditor) {
    return <main className="studio-app-main">{children}</main>;
  }

  const headerClassName = [
    "site-header",
    isHome ? "site-header--home" : "site-header--solid",
    scrolled ? "site-header--scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="site-announcement">
        <p>
          SƏNİN DİZAYNIN
          <span aria-hidden="true">·</span>
          REAL MƏHSULA ÇEVRİLİR
        </p>
      </div>

      <header className={headerClassName}>
        <div className="site-header-inner">
          <Link
            className="site-brand"
            href="/"
            aria-label="Creation ana səhifə"
          >
            <BrandLogo />
          </Link>

          <nav className="site-nav" aria-label="Əsas naviqasiya">
            <Link
              href="/products"
              className="site-nav-link"
              aria-current={pathname === "/products" ? "page" : undefined}
            >
              Məhsullar
            </Link>

            <Link href="/#how-it-works" className="site-nav-link">
              Necə işləyir
            </Link>

            <Link
              href="/editor?product=classic-tshirt"
              className="site-nav-link"
            >
              Özün yarat
            </Link>
          </nav>

          <div className="site-header-actions">
            <Link
              href="/products"
              className="site-header-products-mobile"
              aria-label="Məhsullara bax"
            >
              Məhsullar
            </Link>

            <Link
              className="site-studio-button"
              href="/editor?product=classic-tshirt"
            >
              <span>Studiyanı aç</span>
              <UiIcon name="arrow" />
            </Link>
          </div>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="footer">
        <Link
          className="footer-brand"
          href="/"
          aria-label="Creation ana səhifə"
        >
          <BrandLogo />
        </Link>

        <span className="footer-status">
          Dizayn prototipi · sifariş hələ aktiv deyil
        </span>
      </footer>
    </>
  );
}