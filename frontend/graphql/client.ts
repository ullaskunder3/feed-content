"use client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const graphqlHttpUri = process.env.NEXT_PUBLIC_GRAPHQL_HTTP as string;
const graphqlWspUri = process.env.NEXT_PUBLIC_GRAPHQL_WS as string;

const httpLink = new HttpLink({
  uri: graphqlHttpUri,
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: graphqlWspUri,
        })
      )
    : null;

const splitLink =
  typeof window !== "undefined" && wsLink
    ? ApolloLink.split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
