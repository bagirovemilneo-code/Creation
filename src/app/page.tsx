import Link from "next/link";
import { ShirtPreview } from "@/components/shirt-preview";

export default function Home() {
  return <section className="hero">
    <div><p className="eyebrow">SƏNİN İDEYAN. SƏNİN İMZAN.</p>
      <h1>Sadəcə geyinmə.<br /><em>Özünü yarat.</em></h1>
      <p className="intro">Bir fikir, bir söz, bir təsvir. Öz dizaynını gündəlik həyatının bir parçasına çevir.</p>
      <Link className="button" href="/products">T-shirt ilə başla ↗</Link>
      <p className="note">İlk addım: məhsul seçimi. Dizayn studiyası hazırlanır.</p>
    </div>
    <div className="showcase"><span className="tag">CANVAS / 001</span><ShirtPreview /><p>Boş bir səth. Sonsuz ideya.</p></div>
  </section>;
}

