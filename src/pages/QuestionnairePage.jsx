import { useEffect } from "react";
import Questionnaire from "../components/Questionnaire.jsx";
import { useLang } from "../i18n/LanguageContext.jsx";

/* The holiday questionnaire on its own page. */
export default function QuestionnairePage() {
  const { t } = useLang();
  useEffect(() => { document.title = t.docForm; }, [t]);
  return <Questionnaire />;
}
