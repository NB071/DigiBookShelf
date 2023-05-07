import { useEffect } from "react";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(()=> {
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/login");
      }
  }, [navigate])
  return <h1>Hi</h1>;
}
