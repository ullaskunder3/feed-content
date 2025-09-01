"use client";

import { cx } from "@/lib/helper";
import * as React from "react";

export function Modal({
  open,
  onClose,
  children,
  title,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed h-screen inset-0 z-50 flex justify-center p-4 items-start"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={cx(
          "relative z-10 w-full max-w-lg rounded-xl bg-white shadow-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
