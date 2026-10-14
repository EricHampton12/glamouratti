import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";

/* Home banner. The questionnaire is the main call to action. */
export default function Hero() {
  const { lang, t } = useLang();
  const alt = lang === "es"
    ? "Esferas navideñas doradas y plateadas con una linterna de vela"
    : "Gold and silver holiday ornaments with a candle lantern";
  return (
    <section className="hero">
      <div className="banner"><img src="/img/banner.jpg" alt={alt} /></div>
      <div className="hero-copy">
        <h1>GLAMOURATTI</h1>
        <p>{t.heroLine}</p>
        <div className="hero-actions">
          <Link className="btn primary btn-lg" to="/questionnaire">{t.heroCta}</Link>
          <Link className="text-link" to="/work">{t.seeWork} →</Link>
        </div>
      </div>
    </section>
  );
}
