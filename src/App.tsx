import React from "react";
import { useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Route } from "react-router-dom";
import Wrapper from "./components/main/Home";
import Navbar from "./components/main/Header";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import { RootState } from "./store/reducers/rootReducer";
import { LoginState } from "./store/reducers/authReducer";
import NewReport from "./components/report/NewReport";
import Report from "./components/report/Report";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const { loggedIn } = useSelector<RootState, LoginState>(
    (state) => state.login
  );

  return (
    <ApolloProvider client={client}>
      {/* {loggedIn && <Navbar />} */}
      <Navbar />
      <div className="App">
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
