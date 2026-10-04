import type { Metadata } from "next";
import { DesignStudio } from "@/features/editor/design-studio";
import "./studio.css";

export const metadata: Metadata = { title: "Dizayn studiyası — Creation" };

export default async function EditorPage({ searchParams }: {
  searchParams: Promise<{ product?: string; title?: string }>;
}) {
  const params = await searchParams;
  const productId = typeof params.product === "string" ? params.product.slice(0, 120) : undefined;
  const productTitle = typeof params.title === "string" ? params.title.slice(0, 120) : undefined;
  return <DesignStudio key={productId || "default"} productId={productId} productTitle={productTitle} />;
}
