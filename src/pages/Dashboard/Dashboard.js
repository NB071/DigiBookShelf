import { useEffect } from "react";
import "./Dashboard.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

//icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

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
    navigate('/login')
  }


  // mobile menu bubble fade-in/out animation
  const pageVariants = {
    initial: {
      opacity: 0,
      x: -300,
      scale: 0.8,
      borderRadius: "50%",
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      borderRadius: "0%",
    },
    exit: {
      opacity: 0,
      x: -300,
      scale: 0.8,
      borderRadius: "50%",
    },
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
    return <h1>Loading</h1>;
  }
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="mobile-menu"
            initial="initial"
            animate={isMenuOpen ? "animate" : "exit"}
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mobile-menu__container"
              initial="initial"
              animate={isMenuOpen ? "animate" : "exit"}
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <NavLink
                to="/Dashboard"
                onClick={handleLogoClick}
                className="mobile-menu__item"
              >
                <DashboardRoundedIcon style={{ fontSize: "2.25rem" }} />
                <h2 className="mobile-menu__item-text">Dashboard</h2>
              </NavLink>
              <NavLink
                to="/manage"
                onClick={handleLogoClick}
                className="mobile-menu__item"
              >
                <DriveFileRenameOutlineRoundedIcon
                  style={{ fontSize: "2.25rem" }}
                />
                <h2 className="mobile-menu__item-text">Mange</h2>
              </NavLink>
              <NavLink
                to="/my-shelf"
                onClick={handleLogoClick}
                className="mobile-menu__item"
              >
                <ClassRoundedIcon style={{ fontSize: "2.25rem" }} />
                <h2 className="mobile-menu__item-text">My shelf</h2>
              </NavLink>
              <NavLink to="/" className="mobile-menu__item">
                <img
                  src={userInfo.avatar_image}
                  className="mobile-menu__user-avatar"
                  alt="user avatar"
                />
                <h2 className="mobile-menu__item-text">{userInfo.username}</h2>
              </NavLink>
              <div className="mobile-menu__close-icon">
                <motion.div
                  initial="initial"
                  animate={isMenuOpen ? "animate" : "exit"}
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  whileTap={{ scale: 0.7 }}
                  onClick={handleLogoClick}
                >
                  <CloseRoundedIcon style={{ fontSize: "3.5rem" }} />
                </motion.div>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
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
