import Image from "next/image";
export const renderAvatar = (author: string, imageUrl?: string | null) => {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={author}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }
  const initials = author
    ? author
        .split(" ")
        .map((n) => n[0] ?? "")
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
      {initials}
    </div>
  );
};
