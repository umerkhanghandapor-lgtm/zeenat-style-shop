import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const messageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().trim().max(20, "Phone is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
  productId: z.number().int().positive().max(999999).optional(),
  productName: z.string().trim().max(200).optional(),
});

export type SendMessageInput = z.infer<typeof messageSchema>;

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => messageSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(
      process.env["SUPABASE_URL"]!,
      key,
      {
        auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        // Opaque sb_ keys aren't JWTs; send only apikey, not the default Authorization bearer.
        global: {
          fetch: (input, init) => {
            const h = new Headers(init?.headers);
            if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
              h.delete("Authorization");
            }
            h.set("apikey", key);
            return fetch(input, { ...init, headers: h });
          },
        },
      },
    );

    const { error } = await supabasePublic.from("shop_messages").insert({
      name: data.name,
      phone: data.phone ? data.phone : null,
      message: data.message,
      product_id: data.productId ?? null,
      product_name: data.productName ?? null,
    });
    if (error) throw new Error("Could not save your message. Please try again.");
    return { ok: true as const };
  });

const inboxSchema = z.object({
  passcode: z.string().trim().min(1, "Password is required").max(100),
});

export type InboxMessage = {
  id: string;
  name: string;
  phone: string | null;
  message: string;
  product_id: number | null;
  product_name: string | null;
  created_at: string;
};

export const listInboxMessages = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inboxSchema.parse(input))
  .handler(async ({ data }) => {
    const passcode = process.env["INBOX_PASSCODE"];
    if (!passcode) {
      throw new Error("The inbox password is not set up yet.");
    }
    const a = new TextEncoder().encode(data.passcode);
    const b = new TextEncoder().encode(passcode);
    const same =
      a.length === b.length && a.every((v, i) => v === b[i]);
    if (!same) return { ok: false as const, messages: [] as InboxMessage[] };

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data: rows, error } = await supabaseAdmin
      .from("shop_messages")
      .select("id, name, phone, message, product_id, product_name, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error("Could not load messages.");
    return { ok: true as const, messages: (rows ?? []) as InboxMessage[] };
  });
