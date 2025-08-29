import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs, resolvers } from "@/lib/schema";

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
  graphiql: {
    subscriptionsProtocol: "SSE",
  },
});

export { yoga as GET, yoga as POST };
