import { io } from 'socket.io-client';

export const initializeSocket = (token, userInfoQuery, setOnlineFriends, setSocket) => {
  if (token && userInfoQuery) {
    const socket = io(process.env.REACT_APP_API_URL, { auth: { token } });

    const friendIds = userInfoQuery.friends
    socket.emit("userFriends", friendIds);

    socket.on("onlineUsers", (users) => {
      setOnlineFriends(users);
    });

    socket.on("addFriend", (friend) => {
      console.log("Received friend request:", friend);
    });

    socket.on("removeFriend", (friend) => {
      console.log("Received friend request:", friend);
    });

    setSocket(socket);
    return socket;
  }
  return null;
};