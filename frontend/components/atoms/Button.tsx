"use client";

import { cx } from "@/lib/helper";
import type * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "subtle" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    subtle: "bg-gray-100 text-black hover:bg-gray-200",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  } as const;
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  } as const;
  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
