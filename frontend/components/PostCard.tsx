// import { Post } from "@/store/useFeedStore";

// interface Props {
//   post: Post;
//   onLike: (id: string) => void;
// }

// export default function PostCard({ post, onLike }: Props) {
//   return (
//     <article
//       className="p-4 border rounded-lg"
//       aria-label={`Post by ${post.author}`}
//     >
//       <div className="font-bold">{post.author}</div>
//       <div className="text-gray-700">{post.content}</div>
//       <div className="text-sm text-gray-500">
//         {new Date(post.timestamp).toLocaleString()}
//       </div>
//       <button
//         onClick={() => onLike(post.id)}
//         aria-label="Like post"
//         className="mt-2 text-orange-500"
//       >
//         ❤️ {post.likes}
//       </button>
//     </article>
//   );
// }
