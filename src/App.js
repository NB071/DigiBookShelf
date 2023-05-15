import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth/AuthProvider";

// components
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Manage from "./pages/Manage/Manage";
import MyShelf from "./pages/MyShelf/MyShelf";
function App() {
  const location = useLocation();

  const { token, logout, login } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (
      token &&
      location.pathname !== "/sign-up" &&
      location.pathname !== "/login"
    ) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user`, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then(({ data }) => {
          setUserInfo(data);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token, location.pathname, logout]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard token={token} userInfo={userInfo} handleLogout={logout} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard token={token} userInfo={userInfo} handleLogout={logout} />
        }
      />
      <Route
        path="/manage"
        element={
          <Manage token={token} userInfo={userInfo} handleLogout={logout} />
        }
      />
      <Route
        path="/my-shelf"
        element={
          <MyShelf token={token} userInfo={userInfo} handleLogout={logout} />
        }
      />
      <Route
        path="/login"
        element={<Login token={token} handleLogin={login} />}
      />
      <Route
        path="/sign-up"
        element={<SignUp handleLogin={login} token={token} />}
      />
    </Routes>
  );
}

export default App;
