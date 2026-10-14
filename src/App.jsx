import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import TestBanner from "./components/TestBanner.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import QuestionnairePage from "./pages/QuestionnairePage.jsx";
import { useLang } from "./i18n/LanguageContext.jsx";

/* On every navigation: jump to #section if the link has one, otherwise to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { t } = useLang();
  return (
    <>
      <ScrollManager />
      <TestBanner />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <p className="foot">{t.foot}</p>
    </>
  );
}
