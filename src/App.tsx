// BUILDING AUTH:
// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";

class App extends React.Component<{}> {
  render() {
    return (
      <AuthContext.Provider value={false}>
        <Router>
          <div>
            <ul>...</ul>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/admin" component={Admin} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
