/* Where questionnaire answers and new reviews are emailed.

   Set ONE of these in the env files:
     VITE_SUBMIT_EMAIL     an email address (sent through FormSubmit.co, no account needed)
     VITE_SUBMIT_ENDPOINT  a full form-service URL (a FormSubmit random-string link, Formspree, etc.)

   .env.development is used by `npm run dev`   (testing: your email)
   .env.production  is used by `npm run build` (live site: the owner's email)            */

const env = import.meta.env;
const email = (env.VITE_SUBMIT_EMAIL || "").trim();
const endpoint = (env.VITE_SUBMIT_ENDPOINT || "").trim();

export const SUBMIT_ENDPOINT = endpoint || (email ? `https://formsubmit.co/ajax/${email}` : "");
export const SUBMIT_DESTINATION = email || endpoint;   // shown in the test-mode banner only
export const IS_TEST = env.DEV;

const isFormSubmit = SUBMIT_ENDPOINT.includes("formsubmit.co");

/* Sends one submission. `subject` becomes the email subject, `replyTo` lets the
   owner hit Reply to answer the client directly. */
export async function postJSON(body, { subject, replyTo } = {}) {
  const payload = {
    ...body,
    _subject: (IS_TEST ? "[TEST] " : "") + (subject || "New website submission"),
    ...(replyTo ? { _replyto: replyTo } : {}),
    ...(isFormSubmit ? { _template: "table", _captcha: "false" } : {}),
  };
  const r = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json().catch(() => ({}));
  // FormSubmit answers 200 with success:"false" (e.g. address not activated yet)
  if (!r.ok || data.success === "false" || data.success === false) {
    const msg = data.message || `HTTP ${r.status}`;
    if (IS_TEST) console.warn("Submission failed:", msg);
    throw new Error(msg);
  }
  return data;
}
