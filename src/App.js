import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./auth/AuthProvider";
import { initializeSocket } from "./socket";
import { useQuery } from "react-query";

// components
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Manage from "./pages/Manage/Manage";
import MyShelf from "./pages/MyShelf/MyShelf";
import SingleBookPage from "./pages/SingleBookPage/SingleBookPage";
import UserProfile from "./pages/UserProfile/UserProfile";

export default function App() {
  const { token, logout, login } = useContext(AuthContext);
  const [rerenderFlag, setRerenderFlag] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [socket, setSocket] = useState(null);

  const userInfoQuery = useQuery("userInfo", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  });
  const userBooksQuery = useQuery("userBooks", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/books`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  });
console.log(userInfoQuery);
  useEffect(() => {
    if (socket) {
      socket.connect();
      console.log(socket);
    }
    if (token && userInfoQuery.data && !socket) {
      initializeSocket(token, userInfoQuery.data, setOnlineFriends, setSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token, userInfoQuery.data, socket]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            token={token}
            userInfo={userInfoQuery.data}
            onlineFriends={onlineFriends}
            handleLogout={logout}
            userBooks={userBooksQuery.data}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            token={token}
            userInfo={userInfoQuery.data}
            handleLogout={logout}
            userBooks={userBooksQuery.data}
            onlineFriends={onlineFriends}
          />
        }
      />
      <Route
        path="/manage"
        element={
          <Manage
            token={token}
            userInfo={userInfoQuery.data}
            handleLogout={logout}
            userBooks={userBooksQuery.data}
            rerenderFlag={rerenderFlag}
            setRerenderFlag={setRerenderFlag}
            onlineFriends={onlineFriends}
          />
        }
      />
      <Route
        path="/my-shelf"
        element={
          <MyShelf
            token={token}
            userInfo={userInfoQuery.data}
            handleLogout={logout}
            userBooks={userBooksQuery.data}
            onlineFriends={onlineFriends}
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
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            handleLogout={logout}
            token={token}
            rerenderFlag={rerenderFlag}
            setRerenderFlag={setRerenderFlag}
            onlineFriends={onlineFriends}
          />
        }
      />
      <Route
        path="/user/profile"
        element={
          <UserProfile
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            handleLogout={logout}
            token={token}
            onlineFriends={onlineFriends}
            socket={socket}
          />
        }
      />
      <Route
        path="/user/privacy"
        element={
          <UserProfile
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            handleLogout={logout}
            token={token}
            onlineFriends={onlineFriends}
            socket={socket}
          />
        }
      />
      <Route
        path="/user/friends"
        element={
          <UserProfile
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            handleLogout={logout}
            token={token}
            onlineFriends={onlineFriends}
            socket={socket}
          />
        }
      />
    </Routes>
  );
}
