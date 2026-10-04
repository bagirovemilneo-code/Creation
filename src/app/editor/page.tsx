import Link from "next/link";
export default function Editor() {
  return <section className="page"><p className="eyebrow">YARADICILIQ STUDİYASI</p><h1>İdeyan üçün yer ayırdıq.</h1>
    <p className="intro">Editor növbəti mərhələdə qurulacaq. Mətn, şəkil, qatlar və çap sahəsi üzərində işləmək mümkün olacaq.</p>
    <p className="note">Bu səhifə ilkin strukturdur. Hazırda dizayn yaratmaq, AI təsviri generasiya etmək və sifariş vermək mümkün deyil.</p>
    <Link className="button" href="/products">Məhsullara qayıt</Link>
  </section>;
}

