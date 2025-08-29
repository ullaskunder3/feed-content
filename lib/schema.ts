import { createPubSub } from "graphql-yoga";

const pubsub = createPubSub<{
  POST_ADDED: [
    {
      id: string;
      title: string;
      content: string;
      author: string;
      createdAt: string;
    }
  ];
}>();

export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    addPost(title: String!, content: String!, author: String!): Post!
  }

  type Subscription {
    postAdded: Post!
  }
`;

const posts: any[] = [];

export const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    addPost: async (_: any, { title, content, author }: any) => {
      const post = {
        id: String(posts.length + 1),
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
      };
      posts.push(post);
      pubsub.publish("POST_ADDED", post);
      return post;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.subscribe("POST_ADDED"),
      resolve: (payload: any) => payload,
    },
  },
};
