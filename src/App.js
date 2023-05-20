import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth/AuthProvider";
import { io } from "socket.io-client";

// components
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Manage from "./pages/Manage/Manage";
import MyShelf from "./pages/MyShelf/MyShelf";
import SingleBookPage from "./pages/SingleBookPage/SingleBookPage";

function App() {
  // const location = useLocation();

  const { token, logout, login } = useContext(AuthContext);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const [socket, setSocket] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [userBooks, setUserBooks] = useState(null);
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL, { auth: { token } });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (socket) {
      // Listen to socket events and handle data
      socket.on("userData", (data) => {
        setUserInfo(data);
      });

      socket.on("friendOnlineStatus", (data) => {
        console.log(data);
      });

      socket.on("userBooks", (data) => {
        setUserBooks(data);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }
  }, [socket]);

  // useEffect(() => {
  //   if (
  //     token &&
  //     location.pathname !== "/sign-up" &&
  //     location.pathname !== "/login"
  //   ) {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
  //         headers: { Authorization: `bearer ${token}` },
  //       })
  //       .then(({ data }) => {
  //         setUserBooks(data);
  //       })
  //       .catch(() => {
  //         logout();
  //       });
  //   }
  // }, [token, location.pathname, rerenderFlag, logout]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            token={token}
            userInfo={userInfo}
            handleLogout={logout}
            userBooks={userBooks}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            token={token}
            userInfo={userInfo}
            handleLogout={logout}
            userBooks={userBooks}
          />
        }
      />
      <Route
        path="/manage"
        element={
          <Manage
            token={token}
            userInfo={userInfo}
            handleLogout={logout}
            userBooks={userBooks}
            rerenderFlag={rerenderFlag}
            setRerenderFlag={setRerenderFlag}
          />
        }
      />
      <Route
        path="/my-shelf"
        element={
          <MyShelf
            token={token}
            userInfo={userInfo}
            handleLogout={logout}
            userBooks={userBooks}
          />
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
      <Route
        path="/user/books/:book_id"
        element={
          <SingleBookPage
            userInfo={userInfo}
            userBooks={userBooks}
            handleLogout={logout}
            token={token}
            rerenderFlag={rerenderFlag}
            setRerenderFlag={setRerenderFlag}
          />
        }
      />
    </Routes>
  );
}

export default App;
