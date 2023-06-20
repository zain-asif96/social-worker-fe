import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("jwt");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const cache = new InMemoryCache();
const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URI}/graphql`,
});

// const link = new HttpLink({
//   uri: `${process.env.REACT_APP_BACKEND_URI}/graphql`,
// });
const client = new ApolloClient({
  cache,
  link: httpLink,
});

export default client;
