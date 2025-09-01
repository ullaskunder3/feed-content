"use client";

import * as React from "react";

export function SearchInput({
  placeholder = "Search or find something on Paper",
  onSubmit,
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className="w-full max-w-xl my-0 mx-auto"
      role="search"
      aria-label="Site"
    >
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-black">
          <path
            fill="currentColor"
            d="M21 20.3L16.7 16a7.5 7.5 0 10-1.4 1.4L20.3 21l.7-.7zM10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
          />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-black"
        />
      </div>
    </form>
  );
}
