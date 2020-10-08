import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Todo from "./component/Todos";
import Admin from "./component/Admin";
import PrivateRoute from "./hoc/PrivateRoute";
import UnPrivatRoute from "./hoc/UnPrivatRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <UnPrivatRoute exact path="/login" component={Login} />
        <UnPrivatRoute exact path="/register" component={Register} />
        <PrivateRoute
          path="/todos"
          roles={["user", "admin"]}
          component={Todo}
        />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
