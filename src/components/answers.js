import { SECTIONS } from "../data/questions.js";

/* Turns one stored answer into readable text in the given language. */
export function formatAnswer(q, answers, lang) {
  const v = answers[q.id];
  if (q.type === "contact") {
    const c = v || {};
    return [c.name, c.phone, c.email].filter(Boolean).join("\n");
  }
  if (q.type === "check") return (v || []).map((x) => q.options.find((o) => o.v === x)[lang]).join(", ");
  if (q.type === "pics" || q.type === "radio") return v ? q.options.find((o) => o.v === v)[lang] : "";
  if (q.type === "date" && v) {
    return new Date(v + "T12:00:00").toLocaleDateString(lang === "es" ? "es-US" : "en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  }
  return (v || "").trim();
}

/* What gets sent to the form endpoint: every answer, labeled in English. */
export function buildPayload(answers, lang) {
  const out = { type: "questionnaire", submittedAt: new Date().toISOString(), language: lang };
  SECTIONS.forEach((s) => s.qs.forEach((q) => {
    if (q.type === "contact") {
      const c = answers.contact || {};
      out["Name"] = (c.name || "").trim();
      out["Phone"] = (c.phone || "").trim();
      out["Email"] = (c.email || "").trim();
    } else {
      out[q.label.en] = formatAnswer(q, answers, "en") || "—";
    }
  }));
  return out;
}

/* Plain-text version for the "Copy answers" button. */
export function summaryText(answers, lang, noAnswer) {
  return SECTIONS.map((s) =>
    `${s.title[lang].toUpperCase()}\n` +
    s.qs.map((q) => `${q.label[lang]}\n${formatAnswer(q, answers, lang) || noAnswer}`).join("\n\n")
  ).join("\n\n");
}
