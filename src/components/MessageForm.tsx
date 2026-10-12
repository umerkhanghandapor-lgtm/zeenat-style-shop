import { useState } from "react";
import type { FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendMessage } from "@/lib/inbox.functions";

type Props = {
  productId?: number;
  productName?: string;
  /** When set, the visitor cannot edit the message text (e.g. a full cart order). */
  fixedMessage?: string;
  defaultText?: string;
  onSent?: () => void;
};

export function MessageForm({
  productId,
  productName,
  fixedMessage,
  defaultText = "",
  onSent,
}: Props) {
  const send = useServerFn(sendMessage);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState(defaultText);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await send({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          message: fixedMessage ?? text,
          productId,
          productName,
        },
      });
      setStatus("sent");
      onSent?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-secondary p-5 text-center">
        <span className="text-2xl" aria-hidden="true">✅</span>
        <p className="mt-1 font-display text-lg font-bold">Message sent!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Thank you — the Zeenat Collection team will read your message and reply
          to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2.5">
      {productName && (
        <p className="rounded-xl bg-secondary px-3 py-2 text-xs font-semibold">
          About: {productName}
        </p>
      )}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
        maxLength={100}
        aria-label="Your name"
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Your phone number (optional)"
        maxLength={20}
        inputMode="tel"
        aria-label="Your phone number"
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold"
      />
      {!fixedMessage && (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your message or question here…"
          required
          maxLength={2000}
          rows={3}
          aria-label="Your message"
          className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold"
        />
      )}
      {status === "error" && (
        <p className="rounded-xl bg-sale/10 px-3 py-2 text-xs font-semibold text-sale">
          Could not send your message. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
