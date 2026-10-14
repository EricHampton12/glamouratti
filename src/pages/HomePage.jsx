import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Reviews from "../components/Reviews.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

/* Home: banner with the main call to action (the questionnaire), reviews at the bottom. */
export default function HomePage() {
  const { t } = useLang();
  useEffect(() => { document.title = t.docHome; }, [t]);
  return (
    <>
      <Hero />
      <Reviews />
    </>
  );
}
