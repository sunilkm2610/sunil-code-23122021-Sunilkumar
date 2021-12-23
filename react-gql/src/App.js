import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";

import "./App.css";
import Card from "./components/Card";

const link = from([new HttpLink({ uri: "http://localhost:4000/graphql" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Card />
    </ApolloProvider>
  );
}

export default App;
