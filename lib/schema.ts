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
    posts(after: ID, limit: Int!): [Post!]!
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

const posts: Post[] = [
  {
    id: "1",
    title: "Starlink Internet",
    author: "elonmusk",
    content:
      "By enabling high-speed, low-latency and affordable Internet globally, Starlink will do more to educate and lift people out of poverty than any NGO ever",
    likes: 19000,
    likedBy: [],
    createdAt: "2025-08-20T12:00:00Z",
  },
  {
    id: "2",
    title: "Historic Day",
    author: "michelleobama",
    content:
      "Michelle and I send our congratulations to a fellow Chicagoan, His Holiness Pope Leo XIV. This is a historic day for the United States, and we will pray for him as he begins the sacred work of leading the Catholic Church and setting an example for so many, regardless of faith.",
    likes: 429000,
    likedBy: [],
    createdAt: "2025-08-08T12:00:00Z",
  },
  {
    id: "3",
    title: "Book Tour Joy",
    author: "michelleobama",
    content:
      "It was such a joy speaking with Ms. Tina Knowles at her first book tour stop for Matriarch! Matriarch is more than a memoir—it’s a love letter to Black women, to our stories, to our families, and to the unshakeable strength that holds us all together.",
    likes: 5200,
    likedBy: [],
    createdAt: "2025-08-20T12:12:00Z",
  },
  {
    id: "4",
    title: "Mars Mission Update",
    author: "elonmusk",
    content:
      "SpaceX is preparing for another crewed mission to Mars next year!",
    likes: 34000,
    likedBy: [],
    createdAt: "2025-08-18T09:30:00Z",
  },
  {
    id: "5",
    title: "Climate Action",
    author: "greta",
    content:
      "Global leaders must act now to reduce emissions and protect the planet.",
    likes: 12000,
    likedBy: [],
    createdAt: "2025-08-19T14:45:00Z",
  },
  {
    id: "6",
    title: "AI Breakthrough",
    author: "techguru",
    content:
      "New AI model achieves human-level performance in natural language tasks.",
    likes: 8000,
    likedBy: [],
    createdAt: "2025-08-21T10:15:00Z",
  },
  {
    id: "7",
    title: "Health Tips",
    author: "drsmith",
    content: "Daily exercise and proper sleep are key for a healthy lifestyle.",
    likes: 5600,
    likedBy: [],
    createdAt: "2025-08-17T08:00:00Z",
  },
  {
    id: "8",
    title: "Art Exhibition",
    author: "artistgal",
    content:
      "Join me at the downtown gallery for my latest modern art showcase.",
    likes: 3200,
    likedBy: [],
    createdAt: "2025-08-16T16:00:00Z",
  },
  {
    id: "9",
    title: "Travel Diaries",
    author: "wanderlust",
    content: "Exploring the hidden gems of Japan this summer. #TravelGoals",
    likes: 4700,
    likedBy: [],
    createdAt: "2025-08-15T11:20:00Z",
  },
  {
    id: "10",
    title: "Cooking Secrets",
    author: "chefmaster",
    content: "5 tips to make your pasta taste like a 5-star restaurant.",
    likes: 6100,
    likedBy: [],
    createdAt: "2025-08-14T18:40:00Z",
  },
  {
    id: "11",
    title: "Music Release",
    author: "popstar",
    content: "Excited to drop my new single next Friday! Stay tuned.",
    likes: 8800,
    likedBy: [],
    createdAt: "2025-08-13T12:00:00Z",
  },
  {
    id: "12",
    title: "Book Recommendation",
    author: "readerlife",
    content:
      "Just finished 'Atomic Habits' – a must-read for self-improvement!",
    likes: 4200,
    likedBy: [],
    createdAt: "2025-08-12T09:15:00Z",
  },
  {
    id: "13",
    title: "Startup Launch",
    author: "entrepreneur",
    content: "Launching our new app to simplify personal finance management.",
    likes: 7300,
    likedBy: [],
    createdAt: "2025-08-11T15:30:00Z",
  },
  {
    id: "14",
    title: "Fitness Challenge",
    author: "fitguru",
    content: "30-day plank challenge starts today! Who's joining?",
    likes: 2100,
    likedBy: [],
    createdAt: "2025-08-10T07:45:00Z",
  },
  {
    id: "15",
    title: "Photography Tips",
    author: "shutterbug",
    content: "Golden hour lighting can transform your landscape photos.",
    likes: 3800,
    likedBy: [],
    createdAt: "2025-08-09T17:20:00Z",
  },
  {
    id: "16",
    title: "Gardening Guide",
    author: "greenthumb",
    content: "Top 10 indoor plants that are easy to care for.",
    likes: 2600,
    likedBy: [],
    createdAt: "2025-08-08T08:50:00Z",
  },
  {
    id: "17",
    title: "Movie Night",
    author: "filmbuff",
    content: "Watching classics tonight! Any recommendations?",
    likes: 4100,
    likedBy: [],
    createdAt: "2025-08-07T21:00:00Z",
  },
  {
    id: "18",
    title: "Tech Conference",
    author: "devguru",
    content: "Join us for the annual Tech Innovators Conference next month.",
    likes: 9500,
    likedBy: [],
    createdAt: "2025-08-06T13:10:00Z",
  },
  {
    id: "19",
    title: "Daily Motivation",
    author: "mindcoach",
    content: "Believe in yourself and take one step at a time.",
    likes: 6700,
    likedBy: [],
    createdAt: "2025-08-05T06:30:00Z",
  },
  {
    id: "20",
    title: "Space Exploration",
    author: "nasa",
    content: "New images from the James Webb telescope are breathtaking!",
    likes: 15400,
    likedBy: [],
    createdAt: "2025-08-04T11:45:00Z",
  },
];

export const resolvers = {
  Query: {
    posts: (_: any, { after, limit }: { after?: string; limit: number }) => {
      let startIndex = 0;
      if (after) {
        const index = posts.findIndex((p) => p.id === after);
        startIndex = index >= 0 ? index + 1 : 0;
      }
      return posts.slice(startIndex, startIndex + limit);
    },
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
