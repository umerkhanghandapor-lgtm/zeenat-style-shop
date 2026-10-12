import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listInboxMessages, type InboxMessage } from "@/lib/inbox.functions";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Shop Inbox — Zeenat Collection" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: InboxPage,
});

function InboxPage() {
  const openInbox = useServerFn(listInboxMessages);
  const [passcode, setPasscode] = useState("");
  const [messages, setMessages] = useState<InboxMessage[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const open = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await openInbox({ data: { passcode } });
      if (res.ok) {
        setMessages(res.messages);
      } else {
        setError("Wrong password. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not open the inbox.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Shop Inbox</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Customer messages and orders sent from the shop.
      </p>

      {messages === null ? (
        <form
          onSubmit={open}
          className="mt-8 max-w-sm rounded-3xl border border-border bg-card p-6"
        >
          <h2 className="font-display text-lg font-bold">Owner sign-in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your inbox password to read customer messages.
          </p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Inbox password"
            required
            aria-label="Inbox password"
            className="mt-4 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-gold"
          />
          {error && (
            <p className="mt-3 rounded-xl bg-sale/10 px-3 py-2 text-xs font-semibold text-sale">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Opening…" : "Open Inbox"}
          </button>
        </form>
      ) : (
        <div className="mt-8 space-y-3">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="font-display text-lg font-bold">No messages yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Customer messages will appear here as they arrive.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <article
                key={m.id}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-bold">{m.name}</h3>
                  {m.phone && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold">
                      📞 {m.phone}
                    </span>
                  )}
                  {m.product_name && (
                    <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-foreground">
                      {m.product_name}
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-muted-foreground">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2.5 text-sm whitespace-pre-line">{m.message}</p>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  );
}
