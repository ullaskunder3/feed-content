"use client";

import Image from "next/image";
import { cx } from "@/lib/helper";
export function Avatar({
  src,
  alt,
  size = 36,
  className,
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const fallback = alt?.trim()?.[0]?.toUpperCase() || "U";
  return (
    <div
      className={cx(
        "rounded-full bg-gray-200 text-black grid place-items-center overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      {src ? (
        <Image
          alt={alt}
          src={src || "/placeholder.svg"}
          width={size}
          height={size}
        />
      ) : (
        <span className="text-xs">{fallback}</span>
      )}
    </div>
  );
}
