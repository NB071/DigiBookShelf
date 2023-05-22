import { Routes, Route } from "react-router-dom";
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
  const [userInfo, setUserInfo] = useState(null);
  const [userBooks, setUserBooks] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };

      const fetchUserBooks = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/books`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setUserBooks(response.data);
        } catch (error) {
          console.error("Failed to fetch user books:", error);
        }
      };

      fetchUserData();
      fetchUserBooks();
    }
  }, [token]);

  useEffect(() => {
    if (token && userInfo) {
      const socket = io(process.env.REACT_APP_API_URL, { auth: { token } });
  
      const friendIds = userInfo.friends.map((friend) => friend);
      socket.emit("userFriends", friendIds);
  
      socket.on("onlineUsers", (users) => {
        setOnlineFriends(users)
      });
  
      return () => {
        socket.off("onlineUsers");
        socket.disconnect();
      };
    }
  }, [token, userInfo]);
  

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            token={token}
            userInfo={userInfo}
            onlineFriends={onlineFriends}
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
            onlineFriends={onlineFriends}
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
            onlineFriends={onlineFriends}

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
            userInfo={userInfo}
            userBooks={userBooks}
            handleLogout={logout}
            token={token}
            rerenderFlag={rerenderFlag}
            setRerenderFlag={setRerenderFlag}
            onlineFriends={onlineFriends}
          />
        }
      />
    </Routes>
  );
}

export default App;
