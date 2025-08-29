import { createServer } from "http";
import { createSchema, createYoga } from "graphql-yoga";
import { WebSocketServer } from "ws";
import { resolvers, typeDefs } from "@/lib/schema";
import { useServer } from "graphql-ws/use/ws";

async function main() {
  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
    graphqlEndpoint: "/api/graphql",
  });

  const server = createServer(yoga);

  // Attach WS server
  const wsServer = new WebSocketServer({ server, path: "/api/graphql" });
  useServer({ schema: yoga.getEnveloped().schema }, wsServer);

  server.listen(4000, () => {
    console.log(
      "🚀 GraphQL server running at http://localhost:4000/api/graphql"
    );
    console.log("📡 Subscriptions ready at ws://localhost:4000/api/graphql");
  });
}

main();
