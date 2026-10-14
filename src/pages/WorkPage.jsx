import { useEffect } from "react";
import { Link } from "react-router-dom";
import Gallery from "../components/Gallery.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

/* Our Work: the portfolio gallery, ending with a nudge back to the questionnaire. */
export default function WorkPage() {
  const { t } = useLang();
  useEffect(() => { document.title = t.docWork; }, [t]);
  return (
    <>
      <Gallery asPage />
      <section className="block work-cta">
        <div className="cta-card">
          <h2>{t.workCtaTitle}</h2>
          <p>{t.workCtaBody}</p>
          <Link className="btn primary" to="/questionnaire">{t.heroCta}</Link>
        </div>
      </section>
    </>
  );
}
