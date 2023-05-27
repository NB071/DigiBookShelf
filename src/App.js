import { Routes, Route } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import axios from "axios";
import AuthContext from "./contexts/auth/AuthProvider";
import SocketContext from "./contexts/socket/SocketProvider";
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
  const [onlineFriends, setOnlineFriends] = useState([]);

  const { token, logout, login } = useContext(AuthContext);
  const { socket, notifications, setNotifications } = useContext(SocketContext);

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

  useMemo(() => {
    if (socket && userInfoQuery.data) {
      socket.emit("userFriends", userInfoQuery.data.friends);
      socket.on("onlineUsers", (users) => {
        setOnlineFriends(users);
      });
    }
  }, [socket, userInfoQuery.data]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            token={token}
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
            handleLogout={logout}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            token={token}
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
            handleLogout={logout}
          />
        }
      />
      <Route
        path="/manage"
        element={
          <Manage
            token={token}
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
            handleLogout={logout}
          />
        }
      />
      <Route
        path="/my-shelf"
        element={
          <MyShelf
            token={token}
            userInfo={userInfoQuery.data}
            userBooks={userBooksQuery.data}
            socket={socket}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
            handleLogout={logout}
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
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
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
            socket={socket}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
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
            socket={socket}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
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
            socket={socket}
            onlineFriends={onlineFriends}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        }
      />
    </Routes>
  );
}
