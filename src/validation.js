/* Form validation rules. Each check returns an error key from src/i18n/strings.js, or null. */

const pad = (n) => String(n).padStart(2, "0");

/* Today as YYYY-MM-DD in the visitor's own time zone (not UTC). */
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ---- Phone ---- */
export const PHONE_MIN_DIGITS = 10;   // US numbers
export const PHONE_MAX_DIGITS = 15;   // longest international numbers

/* While typing: keep only digits and the characters people use to write phone numbers. */
export const cleanPhone = (v) => v.replace(/[^\d+()\-.\s]/g, "").slice(0, 22);

const digits = (v) => (v || "").replace(/\D/g, "");

/* On leaving the field: a plain 10-digit US number becomes (555) 555-0100. */
export function formatPhone(v) {
  const d = digits(v);
  if (!v.trim().startsWith("+") && d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (!v.trim().startsWith("+") && d.length === 11 && d[0] === "1") return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return v.trim();
}

export const isValidPhone = (v) => {
  const n = digits(v).length;
  return n >= PHONE_MIN_DIGITS && n <= PHONE_MAX_DIGITS;
};

/* ---- Email ---- */
export const isValidEmail = (v) => /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i.test((v || "").trim());

/* ---- Whole numbers ---- */
export const cleanNumber = (v) => v.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 3);

/* ---- One question ---- */
export function validateQuestion(q, value) {
  if (q.type === "contact") {
    const c = value || {};
    const phone = (c.phone || "").trim();
    const email = (c.email || "").trim();
    if (!(c.name || "").trim()) return "nameErr";
    if (!phone && !email) return "contactErr";
    if (phone && !isValidPhone(phone)) return "phoneErr";
    if (email && !isValidEmail(email)) return "emailErr";
    return null;
  }
  if (q.type === "number" && value !== undefined && value !== "") {
    const n = Number(value);
    if (!Number.isInteger(n) || n < q.min || n > q.max) return "numberErr";
  }
  if (q.type === "date" && value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < todayISO()) return "dateErr";
  }
  return null;
}

/* Which field to put the cursor in for a given error. */
export const fieldForError = (q, err) =>
  q.type !== "contact" ? `f-${q.id}`
  : err === "nameErr" ? "f-name"
  : err === "emailErr" ? "f-email"
  : "f-phone";