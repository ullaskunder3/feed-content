import { createPubSub } from "graphql-yoga";

const pubsub = createPubSub<{
  POST_ADDED: [Post];
  POST_LIKED: [Post];
}>();

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
};

export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    likes: Int!
    createdAt: String!
    likedBy: [String!]!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    addPost(title: String!, content: String!, author: String!): Post!
    likePost(id: ID!, user: String!): Post
  }

  type Subscription {
    postAdded: Post!
    postLiked: Post!
  }
`;

const posts: Post[] = [];

export const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    addPost: async (_: any, { title, content, author }: any) => {
      const post: Post = {
        id: String(posts.length + 1),
        title,
        content,
        author,
        likes: 0,
        likedBy: [],
        createdAt: new Date().toISOString(),
      };
      posts.push(post);
      pubsub.publish("POST_ADDED", post);
      return post;
    },
    likePost: async (_: any, { id, user }: any) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return null;

      if (!post.likedBy.includes(user)) {
        post.likedBy.push(user);
        post.likes++;
        pubsub.publish("POST_LIKED", post);
      }

      return post;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.subscribe("POST_ADDED"),
      resolve: (payload: Post) => payload,
    },
    postLiked: {
      subscribe: () => pubsub.subscribe("POST_LIKED"),
      resolve: (payload: Post) => payload,
    },
  },
};
