"use client";

import * as React from "react";
import { SearchInput } from "../molecule/SearchInput";
import { Button } from "../atoms/Button";
import { Avatar } from "../atoms/Avator";
import { Modal } from "../molecule/Modal";
import { AddPostForm } from "./AddPostForm";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-black">Muze</span>
        </div>

        <div className="flex-1 px-4">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)} className="shadow-sm">
            New Post
          </Button>
          <Avatar
            alt="You"
            src="https://ullaskunder.tech/_next/image?url=%2Fimages%2Fullaskunder3.webp&w=640&q=75"
            size={32}
          />
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Post">
        <AddPostForm
          onCancel={() => setOpen(false)}
          onSubmitted={() => setOpen(false)}
        />
      </Modal>
    </header>
  );
}
