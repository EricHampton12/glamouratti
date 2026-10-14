import { createContext, useContext, useEffect, useState } from "react";
import { T } from "./strings.js";

const LanguageContext = createContext(null);
const KEY = "glam-lang";

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {}
  return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch {}
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

/* Use inside any component: const { lang, setLang, t } = useLang(); */
export function useLang() {
  return useContext(LanguageContext);
}
