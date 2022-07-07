import { InMemoryCache } from "apollo-cache-inmemory";

export default function (context) {
  return {
    httpLinkOptions: {
      uri: "https://nomizo-fe-web.hasura.app/v1/graphql",
      credentials: "same-origin",
    },
    cache: new InMemoryCache(),
    wsEndpoint: "wss://nomizo-fe-web.hasura.app/v1/graphql",
  };
}