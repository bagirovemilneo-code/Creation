import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creation — ideyanı geyin",
  description: "Öz ideyanı t-shirt dizaynına çevir. Mətn, şəkil və sənin yaradıcılığın üçün şəxsi dizayn studiyası.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

