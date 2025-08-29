import { createPubSub } from "graphql-yoga";

const pubsub = createPubSub<{
  POST_ADDED: [Post];
}>();

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
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
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    addPost(title: String!, content: String!, author: String!): Post!
    likePost(id: ID!): Post
  }

  type Subscription {
    postAdded: Post!
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
        createdAt: new Date().toISOString(),
      };
      posts.push(post);
      pubsub.publish("POST_ADDED", post);
      return post;
    },
    likePost: async (_: any, { id }: any) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return null;
      post.likes++;
      return post;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.subscribe("POST_ADDED"),
      resolve: (payload: Post) => payload,
    },
  },
};
