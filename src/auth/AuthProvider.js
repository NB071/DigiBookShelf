import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();
 
  const login = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);
 
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token && location.pathname !== "/sign-up") {
          navigate("/login")
        }
        else if (
          token &&
          location.pathname !== "/sign-up" &&
          location.pathname !== "/login"
        ) {
          await axios.get(`${process.env.REACT_APP_API_URL}/api/verify`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
        } 
      } catch (err) {
        logout();
        navigate("/login");
      }
    };

    verifyToken();
  }, [token, location.pathname, navigate, logout]);



  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
