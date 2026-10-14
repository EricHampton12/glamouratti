import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  if (mode === "production" && !env.VITE_SUBMIT_EMAIL && !env.VITE_SUBMIT_ENDPOINT) {
    throw new Error(
      "\n\nThe live site has nowhere to send form submissions.\n" +
      "Add the business owner's email to .env.production:\n\n" +
      "  VITE_SUBMIT_EMAIL=owner@example.com\n"
    );
  }
  return { plugins: [react()] };
});
