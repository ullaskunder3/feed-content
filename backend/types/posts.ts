type TPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
  imageUrl?: string | null;
};

type TGetPostsResponse = {
  posts: TPost[];
};

type TGetPostsVars = {
  after?: string | null;
  limit: number;
};
type TPostLikedResponse = {
  postLiked: TPost;
};

type TPostAddedResponse = {
  postAdded: TPost;
};

type TAddPostArgs = {
  title: string;
  content: string;
  author: string;
};

type TLikePostArgs = {
  id: string;
  user: string;
};
