import { Link, NavLink } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Header() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="site-head">
      <div className="in">
        <Link className="brand" to="/">GLAMOURATTI</Link>
        <nav className="site-nav" aria-label="Site">
          <NavLink to="/work">{t.navWork}</NavLink>
          <Link to="/#reviews">{t.navReviews}</Link>
          <NavLink to="/questionnaire" className={({ isActive }) => "nav-cta" + (isActive ? " active" : "")}>
            {t.navForm}
          </NavLink>
        </nav>
        <div className="lang" role="group" aria-label="Language / Idioma">
          {[["en", "English"], ["es", "Español"]].map(([code, label]) => (
            <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
