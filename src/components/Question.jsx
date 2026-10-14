import { useLang } from "../i18n/LanguageContext.jsx";
import { cleanNumber, cleanPhone, fieldForError, formatPhone, todayISO } from "../validation.js";

const SIZE_CHART_ALT = {
  en: "Tree size guide from 4–5 ft to 9–10 ft, next to a 6 ft person",
  es: "Guía de tamaños de árbol, de 4–5 pies a 9–10 pies, junto a una persona de 6 pies",
};

/* Renders one question of any type. `value` is its answer, `onChange(next)` sets it. */
export default function Question({ q, value, onChange, error }) {
  const { lang, t } = useLang();
  const label = q.label[lang];
  const cls = "q" + (error ? " invalid" : "");

  if (q.type === "contact") {
    const c = value || {};
    const badField = error && fieldForError(q, error);
    const fields = [
      { k: "name",  type: "text",  ac: "name",  maxLength: 80 },
      { k: "phone", type: "tel",   ac: "tel",   inputMode: "tel", maxLength: 22, placeholder: "(555) 555-0100",
        clean: cleanPhone, onBlur: formatPhone },
      { k: "email", type: "email", ac: "email", inputMode: "email", maxLength: 120, placeholder: "name@example.com" },
    ];
    return (
      <div className={cls}>
        <div className="qt" style={{ font: "600 1.1rem/1.4 var(--display)" }}>{label}</div>
        <div className="contact-grid">
          {fields.map((f) => (
            <label key={f.k} htmlFor={`f-${f.k}`}>
              <span>{t[f.k]}</span>
              <input id={`f-${f.k}`} type={f.type} autoComplete={f.ac} inputMode={f.inputMode}
                maxLength={f.maxLength} placeholder={f.placeholder} value={c[f.k] || ""}
                aria-invalid={badField === `f-${f.k}` || undefined}
                onChange={(e) => onChange({ ...c, [f.k]: f.clean ? f.clean(e.target.value) : e.target.value })}
                onBlur={f.onBlur ? (e) => onChange({ ...c, [f.k]: f.onBlur(e.target.value) }) : undefined} />
            </label>
          ))}
        </div>
        {error && <div className="err" role="alert">{t[error]}</div>}
      </div>
    );
  }

  if (q.type === "text" || q.type === "textarea" || q.type === "date" || q.type === "number") {
    const id = `f-${q.id}`;
    return (
      <div className={cls}>
        <label className="qt" htmlFor={id}>{label}</label>
        {q.chart && (
          <div className="chart"><img src="/img/size-chart.jpg" alt={SIZE_CHART_ALT[lang]} loading="lazy" /></div>
        )}
        {q.type === "textarea" ? (
          <textarea id={id} rows={3} placeholder={t.answer} value={value || ""} onChange={(e) => onChange(e.target.value)} />
        ) : q.type === "date" ? (
          /* min stops the calendar from offering past days; validation also catches typed-in ones */
          <input id={id} type="date" min={todayISO()} value={value || ""} aria-invalid={!!error || undefined}
            onChange={(e) => onChange(e.target.value)} />
        ) : q.type === "number" ? (
          /* text + numeric keypad instead of type=number, which accepts "e", "-" and "." */
          <input id={id} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={3}
            placeholder={`${q.min}–${q.max}`} value={value || ""} aria-invalid={!!error || undefined}
            onChange={(e) => onChange(cleanNumber(e.target.value))} />
        ) : (
          <input id={id} type="text" placeholder={t.answer} value={value || ""} onChange={(e) => onChange(e.target.value)} />
        )}
        {error && <div className="err" role="alert">{t[error]}</div>}
      </div>
    );
  }

  // radio, check, pics
  const multi = q.type === "check";
  const selected = multi ? value || [] : value;
  const toggle = (v) =>
    multi ? onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]) : onChange(v);

  return (
    <div className={cls}>
      <fieldset>
        <legend className="qt">{label}</legend>
        <div className={q.type === "pics" ? "pics" : "choices"}>
          {q.options.map((o) => {
            const id = `f-${q.id}-${o.v}`;
            const checked = multi ? selected.includes(o.v) : selected === o.v;
            const input = (
              <input type={multi ? "checkbox" : "radio"} name={q.id} id={id} value={o.v}
                checked={checked} onChange={() => toggle(o.v)} />
            );
            return q.type === "pics" ? (
              <label key={o.v} className="pic" htmlFor={id}>
                <div className="frame"><img src={`/img/${o.img}.jpg`} alt={o[lang]} loading="lazy" /></div>
                {input}
                <span className="cap"><span className="dot" aria-hidden="true" /><span>{o[lang]}</span></span>
              </label>
            ) : (
              <label key={o.v} className="choice" htmlFor={id}>{input}<span>{o[lang]}</span></label>
            );
          })}
        </div>
      </fieldset>
      {error && <div className="err" role="alert">{t[error]}</div>}
    </div>
  );
}
