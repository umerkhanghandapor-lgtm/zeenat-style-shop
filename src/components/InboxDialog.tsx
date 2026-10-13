import { useEffect, useState } from "react";
import { MessageForm } from "./MessageForm";

/** Global listener: any link to "#message=..." opens this message form. */
export function InboxDialog() {
  const [text, setText] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (!href.startsWith("#message=")) return;
      e.preventDefault();
      e.stopPropagation();
      setText(decodeURIComponent(href.slice("#message=".length)));
      setKey((k) => k + 1);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (text === null) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/50 p-4 sm:items-center"
      onClick={() => setText(null)}
    >
      <div
        role="dialog"
        aria-label="Send us a message"
        className="w-full max-w-md rounded-3xl bg-background p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">Message Zeenat Collection</h3>
          <button
            onClick={() => setText(null)}
            aria-label="Close"
            className="rounded-full px-2 text-lg text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <MessageForm key={key} defaultText={text} />
      </div>
    </div>
  );
}
