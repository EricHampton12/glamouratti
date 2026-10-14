import { IS_TEST, SUBMIT_DESTINATION } from "../config.js";

/* Only appears during `npm run dev`, never on the live site. */
export default function TestBanner() {
  if (!IS_TEST) return null;
  return (
    <div className="test-banner" role="note">
      {SUBMIT_DESTINATION
        ? <>Test mode: form submissions are emailed to <strong>{SUBMIT_DESTINATION}</strong> with “[TEST]” in the subject.</>
        : <>Test mode: no email is set in <code>.env.development</code>, so submissions aren’t sent anywhere.</>}
    </div>
  );
}
