import { useEffect } from "react";
import "./Dashboard.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
//icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // for log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setUserInfo(data);
        console.log(data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (!userInfo) {
    return (
      <AnimatePresence>
        <Loading />
      </AnimatePresence>
    );
  }
  return (
    <>
      <MobileMenu
        Toggle={handleLogoClick}
        isMenuOpen={isMenuOpen}
        userInfo={userInfo}
      />
      <Header
        userAvatar={userInfo.avatar_image}
        username={`${userInfo.first_name} ${userInfo.last_name}`}
        menuToggle={handleLogoClick}
      />
      <main className="dashboard">
        <aside className="side-menu">
          <nav className="nav">
            <NavLink to="/Dashboard" className="nav__item">
              <DashboardRoundedIcon style={{ fontSize: "2.25rem" }} />
              <h4 className="nav__item-text">Dashboard</h4>
            </NavLink>
            <NavLink to="/manage" className="nav__item">
              <DriveFileRenameOutlineRoundedIcon
                style={{ fontSize: "2.25rem" }}
              />
              <h4 className="nav__item-text">Mange</h4>
            </NavLink>
            <NavLink to="/my-shelf" className="nav__item">
              <ClassRoundedIcon style={{ fontSize: "2.25rem" }} />
              <h4 className="nav__item-text">My shelf</h4>
            </NavLink>
          </nav>
          <div className="side-menu__friends">
            <h4>Friends</h4>
            <div className="side-menu__friends-avatars-wrapper"></div>
          </div>
          <div className="side-menu__bottom">
            <div className="side-menu__bottom-option">
              <InfoRoundedIcon style={{ fontSize: "2.25rem" }} />
              <h4 className="side-menu__bottom-option-text">Help</h4>
            </div>
            <div className="side-menu__bottom-option" onClick={handleLogout}>
              <MeetingRoomRoundedIcon style={{ fontSize: "2.25rem" }} />
              <h4 className="side-menu__bottom-option-text">Log out</h4>
            </div>
          </div>
        </aside>

        <section className="recent-reading"></section>
        <section className="book-options">
          <div className="NYT-books"></div>
          <div className="user-reading"></div>
        </section>
        <section className="banner"></section>
        <section className="manage-CTA"></section>
        <section className="slider"></section>
      </main>
    </>
  );
}
