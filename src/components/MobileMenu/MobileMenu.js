import "./MobileMenu.scss";

import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { mobileMenuVariant } from "../../pageVariants/variants";

//icons
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function MobileMenu({ Toggle, isMenuOpen, userInfo }) {
  const navigate = useNavigate()
  const location = useLocation()
   // for log out
   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.nav
      className="mobile-menu"
      initial="initial"
      animate={isMenuOpen ? "animate" : "exit"}
      exit="exit"
      variants={mobileMenuVariant}
      transition={{ duration: 0.5 }}
      key="mobileMenu"
    >
      <motion.div
        className="mobile-menu__container"
        initial="initial"
        animate={isMenuOpen ? "animate" : "exit"}
        exit="exit"
        variants={mobileMenuVariant}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {/* Menu items */}
        <NavLink to="/Dashboard" onClick={Toggle} className={`mobile-menu__item ${location.pathname === '/' ? "active" : ""}`}>
          <DashboardRoundedIcon style={{ fontSize: "2.25rem" }} />
          Dashboard
        </NavLink>
        <NavLink to="/manage" onClick={Toggle} className="mobile-menu__item">
          <DriveFileRenameOutlineRoundedIcon style={{ fontSize: "2.25rem" }} />
          Manage
        </NavLink>
        <NavLink to="/my-shelf" onClick={Toggle} className="mobile-menu__item">
          <ClassRoundedIcon style={{ fontSize: "2.25rem" }} />
          My Shelf
        </NavLink>
        <NavLink className="mobile-menu__item" onClick={handleLogout}>
          <img
            src={userInfo.avatar_image}
            className="mobile-menu__user-avatar"
            alt="user avatar"
          />
          {userInfo.username}
        </NavLink>
        {/* Close icon */}
        <div className="mobile-menu__close-icon">
          <motion.div
            initial="initial"
            animate={isMenuOpen ? "animate" : "exit"}
            exit="exit"
            variants={mobileMenuVariant}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileTap={{ scale: 0.7 }}
            onClick={Toggle}
          >
            <CloseRoundedIcon style={{ fontSize: "3.5rem" }} />
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
