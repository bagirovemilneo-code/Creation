"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLogo } from "./brand-logo";
import { UiIcon } from "./ui-icon";

export function SiteShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const mobileViewport = window.matchMedia("(max-width: 760px)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    mobileViewport.addEventListener("change", handleViewportChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      mobileViewport.removeEventListener("change", handleViewportChange);
    };
  }, [menuOpen]);

  if (isEditor) {
    return <main className="studio-app-main">{children}</main>;
  }

  const headerClassName = [
    "site-header",
    scrolled ? "site-header--scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <a className="site-skip-link" href="#main-content">Məzmuna keç</a>

      <header className={headerClassName} ref={headerRef}>
        <div className="site-header-inner">
          <Link
            className="site-brand"
            href="/"
            aria-label="Creation ana səhifə"
            onClick={() => setMenuOpen(false)}
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

          </nav>

          <div className="site-header-actions">
            <Link
              className="site-studio-button"
              href="/editor?product=classic-tshirt"
              aria-label="Dizayn studiyasını aç"
              onClick={() => setMenuOpen(false)}
            >
              <span className="site-studio-label">Studiyanı aç</span>
              <span className="site-studio-label-mobile">Yarat</span>
              <UiIcon name="arrow" />
            </Link>

            <button
              className="site-menu-button"
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <UiIcon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <nav
          id="site-mobile-navigation"
          className="site-mobile-nav"
          aria-label="Mobil naviqasiya"
          hidden={!menuOpen}
        >
          <Link href="/products" aria-current={pathname === "/products" ? "page" : undefined} onClick={() => setMenuOpen(false)}>
            Məhsullar <UiIcon name="arrow" />
          </Link>
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)}>
            Necə işləyir <UiIcon name="arrow" />
          </Link>
          <Link href="/editor?product=classic-tshirt" onClick={() => setMenuOpen(false)}>
            Dizayn studiyası <UiIcon name="arrow" />
          </Link>
        </nav>
      </header>

      <main className="app-main" id="main-content" tabIndex={-1}>{children}</main>

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
