import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import RegisterUserPage from "./components/RegisterUserPage";
import RegisterPointPage from "./components/RegisterPointPage";
import Sidebar from "./components/Sidebar";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("authenticated") === "true";
    setAuthenticated(isAuthenticated);
  }, []);

  const handleAuthentication = (isLoggedIn) => {
    setAuthenticated(isLoggedIn);
    localStorage.setItem("authenticated", isLoggedIn);
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? (
            <>
              <Sidebar />
              <Component {...props} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  const AdminRoute = ({ component: Component, ...rest }) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated && userData && userData.userType === "ADMIN" ? (
            <>
              <Sidebar />
              <Component {...props} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage handleAuthentication={handleAuthentication} />
        </Route>
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <AdminRoute path="/registerUser" component={RegisterUserPage} />
        <ProtectedRoute path="/registerPoint" component={RegisterPointPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Routes;
