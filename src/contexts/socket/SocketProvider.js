import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../auth/AuthProvider";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token && !socket) {
      const socket = io(process.env.REACT_APP_API_URL, { auth: { token } });

      socket.on("connect", () => {
        setSocket(socket);
      });
      socket.emit("getNotifications");

      socket.on("notifications", (notification) => {
        setNotifications(notification);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket.off("notifications");
      }
    };
  }, [token, socket]);
  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>{children}</SocketContext.Provider>
  );
};
export default SocketContext;
