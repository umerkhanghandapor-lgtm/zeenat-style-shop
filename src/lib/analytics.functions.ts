import { createServerFn } from "@tanstack/react-start";

export const getGaId = createServerFn({ method: "GET" }).handler(async () => {
  const id = (process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? "").trim();
  return { gaId: /^G-[A-Z0-9]+$/i.test(id) ? id : "" };
});
