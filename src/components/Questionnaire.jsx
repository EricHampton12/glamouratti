import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { SECTIONS } from "../data/questions.js";
import { IS_TEST, SUBMIT_ENDPOINT, postJSON } from "../config.js";
import { buildPayload, formatAnswer, summaryText } from "./answers.js";
import Question from "./Question.jsx";
import { fieldForError, validateQuestion } from "../validation.js";

const reduceMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Questionnaire() {
  const { lang, t } = useLang();
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState({});      // { questionId: stringKey }
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [clearArmed, setClearArmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [devDetail, setDevDetail] = useState("");   // test mode only: why a send failed
  const top = useRef(null);
  const firstRender = useRef(true);

  const last = SECTIONS.length - 1;
  const section = SECTIONS[page];

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    top.current?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
  }, [page, done]);

  useEffect(() => {
    if (!clearArmed) return;
    const id = setTimeout(() => setClearArmed(false), 3500);
    return () => clearTimeout(id);
  }, [clearArmed]);

  const setAnswer = (id) => (v) => {
    setAnswers((a) => ({ ...a, [id]: v }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: undefined }));
  };

  /* Checks every question on the current page; focuses the first problem. */
  function validate() {
    const found = {};
    for (const q of section.qs) {
      const err = validateQuestion(q, answers[q.id]);
      if (err) found[q.id] = err;
    }
    setErrors(found);
    const first = section.qs.find((q) => found[q.id]);
    if (first) {
      document.getElementById(fieldForError(first, found[first.id]))?.focus();
      return false;
    }
    return true;
  }

  async function submit() {
    if (!validate()) return;
    if (SUBMIT_ENDPOINT) {
      setSending(true);
      try {
        const c = answers.contact || {};
        await postJSON(buildPayload(answers, lang), {
          subject: `Holiday questionnaire – ${c.name?.trim() || "New client"}`,
          replyTo: c.email?.trim() || undefined,
        });
      }
      catch (err) {
        setSending(false);
        if (IS_TEST) setDevDetail(err.message);
        setErrors({ [section.qs[section.qs.length - 1].id]: "sendErr" });
        return;
      }
      setSending(false);
    }
    setDevDetail("");
    setDone(true);
  }

  function reset() {
    setAnswers({}); setErrors({}); setPage(0); setDone(false); setClearArmed(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryText(answers, lang, t.noAnswer));
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="wrap" id="questionnaire" ref={top}>
      <div className="card title-card">
        <div className="inner">
          <div className="block-title" style={{ marginBottom: 12 }}>
            <h2 style={{ font: "italic 700 1.8rem/1.15 var(--display)", margin: 0 }}>{t.formTitle}</h2>
          </div>
          <div className="intro">{t.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </div>

      {!done ? (
        <>
          <div className="progress" aria-live="polite">
            <span>{t.step(page + 1, SECTIONS.length)}</span>
            <div className="bar"><span style={{ width: `${((page + 1) / SECTIONS.length) * 100}%` }} /></div>
          </div>

          <form noValidate onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {section.qs.map((q, i) => (
              <div className="card" key={q.id}>
                {i === 0 && <h2 className="section-head">{section.title[lang]}</h2>}
                <Question q={q} value={answers[q.id]} onChange={setAnswer(q.id)} error={errors[q.id]} />
              </div>
            ))}
          </form>

          <div className="nav">
            {page > 0 && <button type="button" className="btn" onClick={() => setPage(page - 1)}>{t.back}</button>}
            {page < last && (
              <button type="button" className="btn" onClick={() => validate() && setPage(page + 1)}>{t.next}</button>
            )}
            {page === last && (
              <button type="button" className="btn primary" disabled={sending} onClick={submit}>{t.submit}</button>
            )}
            <button type="button" className="btn link"
              onClick={() => (clearArmed ? reset() : setClearArmed(true))}>
              {clearArmed ? t.confirmClear : t.clear}
            </button>
          </div>
          {IS_TEST && devDetail && <p className="note" role="alert">Test mode, email service said: {devDetail}</p>}
        </>
      ) : (
        <div className="card done">
          <div className="section-head">{t.doneHead}</div>
          <div className="inner">
            <h2>{t.doneTitle}</h2>
            <p style={{ margin: 0, maxWidth: "65ch" }}>{t.doneBody}</p>
            {!SUBMIT_ENDPOINT && <p className="note">{t.previewNote}</p>}
            <dl className="summary">
              {SECTIONS.flatMap((s) => s.qs).map((q) => (
                <div key={q.id}>
                  <dt>{q.label[lang]}</dt>
                  <dd>{formatAnswer(q, answers, lang) || t.noAnswer}</dd>
                </div>
              ))}
            </dl>
            <div className="nav">
              <button type="button" className="btn" onClick={copy}>{copied ? t.copied : t.copy}</button>
              <button type="button" className="btn link" onClick={reset}>{t.again}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
