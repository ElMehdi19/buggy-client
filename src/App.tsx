import React from "react";
// import { useSelector } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Route } from "react-router-dom";
import Wrapper from "./components/main/Home";
import Navbar from "./components/main/Header";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
// import { RootState } from "./store/reducers/rootReducer";
// import { LoginState } from "./store/reducers/authReducer";
import NewReport from "./components/report/NewReport";
import Report from "./components/report/Report";
import { getMainDefinition } from "@apollo/client/utilities";

import Blank from "./components/main/Blank";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  credentials: "include",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  // const { loggedIn } = useSelector<RootState, LoginState>(
  //   (state) => state.login
  // );

  return (
    <ApolloProvider client={client}>
      {/* {loggedIn && <Navbar />} */}
      <Navbar />
      <div className="App">
        <Route exact path="/blank" component={Blank} />
        <Route exact path="/" component={Wrapper} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/report/new" component={NewReport} />
        <Route path="/reports/:reportId" component={Report} />
      </div>
    </ApolloProvider>
  );
};

export default App;
