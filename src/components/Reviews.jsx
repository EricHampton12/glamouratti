import { Fragment, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { REVIEWS } from "../data/reviews.js";
import { IS_TEST, SUBMIT_ENDPOINT, postJSON } from "../config.js";

function ReviewCard({ review }) {
  const { lang, t } = useLang();
  const n = Math.max(0, Math.min(5, review.stars | 0));
  const who = [review.name, review.city].filter(Boolean).join(" · ");
  const other = review.lang && review.lang !== lang ? ` · ${t.inLang}` : "";
  return (
    <figure className="review">
      <div className="stars" aria-label={`${n}/5`}>{"★".repeat(n) + "☆".repeat(5 - n)}</div>
      <blockquote>{review.text}</blockquote>
      <figcaption>{who + other}</figcaption>
    </figure>
  );
}

function ReviewForm() {
  const { lang, t } = useLang();
  const empty = { stars: "", name: "", city: "", text: "" };
  const [form, setForm] = useState(empty);
  const [msgKey, setMsgKey] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.stars || !form.text.trim()) return setMsgKey("reviewNeed");
    if (SUBMIT_ENDPOINT) {
      try {
        await postJSON({
          type: "review", submittedAt: new Date().toISOString(), language: lang,
          stars: +form.stars, name: form.name.trim(), city: form.city.trim(), review: form.text.trim(),
        }, { subject: `New website review – ${form.stars}★ – ${form.name.trim() || "Anonymous"}` });
      } catch (err) {
        if (IS_TEST) console.warn("Review not sent:", err.message);
        return setMsgKey("sendErr");
      }
      setMsgKey("reviewThanks");
    } else setMsgKey("reviewPreview");
    setForm(empty);
  }

  return (
    <form className="review-form" noValidate onSubmit={submit}>
      <h3>{t.leaveReview}</h3>
      <fieldset>
        <legend className="sr">{t.ratingLabel}</legend>
        {/* Reversed order so CSS can highlight hovered star and all before it */}
        <div className="rating">
          {[5, 4, 3, 2, 1].map((n) => (
            <Fragment key={n}>
              <input type="radio" name="stars" id={`star${n}`} value={n}
                checked={form.stars === String(n)} onChange={set("stars")} />
              <label htmlFor={`star${n}`} aria-label={String(n)}>★</label>
            </Fragment>
          ))}
        </div>
      </fieldset>
      <div className="contact-grid">
        <label htmlFor="r-name">{t.reviewName}
          <input type="text" id="r-name" autoComplete="name" value={form.name} onChange={set("name")} />
        </label>
        <label htmlFor="r-city">{t.reviewCity}
          <input type="text" id="r-city" value={form.city} onChange={set("city")} />
        </label>
      </div>
      <label htmlFor="r-text" className="sr">{t.reviewText}</label>
      <textarea id="r-text" rows={3} placeholder={t.reviewText} value={form.text} onChange={set("text")} />
      <div className="nav">
        <button type="submit" className="btn primary">{t.reviewSend}</button>
        <span className="ok" role="status">{msgKey && t[msgKey]}</span>
      </div>
    </form>
  );
}

export default function Reviews() {
  const { t } = useLang();
  return (
    <section className="block" id="reviews">
      <div className="block-title"><h2>{t.reviewsTitle}</h2><span className="rule" /></div>
      <div className="reviews">
        {REVIEWS.length
          ? REVIEWS.map((r, i) => <ReviewCard key={i} review={r} />)
          : <p className="empty">{t.reviewsEmpty}</p>}
      </div>
      <ReviewForm />
    </section>
  );
}
