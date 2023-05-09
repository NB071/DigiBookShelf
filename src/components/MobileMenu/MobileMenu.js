import "./MobileMenu.scss";

import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

import { mobileMenuVariant } from "../../pageVariants/variants";
//icons
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function MobileMenu({ Toggle, isMenuOpen, userInfo }) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.nav
          className="mobile-menu"
          initial="initial"
          animate={isMenuOpen ? "animate" : "exit"}
          exit="exit"
          variants={MobileMenu}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mobile-menu__container"
            initial="initial"
            animate={isMenuOpen ? "animate" : "exit"}
            exit="exit"
            variants={mobileMenuVariant}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <NavLink
              to="/Dashboard"
              onClick={mobileMenuVariant}
              className="mobile-menu__item"
            >
              <DashboardRoundedIcon style={{ fontSize: "2.25rem" }} />
              <h2 className="mobile-menu__item-text">Dashboard</h2>
            </NavLink>
            <NavLink
              to="/manage"
              onClick={mobileMenuVariant}
              className="mobile-menu__item"
            >
              <DriveFileRenameOutlineRoundedIcon
                style={{ fontSize: "2.25rem" }}
              />
              <h2 className="mobile-menu__item-text">Mange</h2>
            </NavLink>
            <NavLink
              to="/my-shelf"
              onClick={mobileMenuVariant}
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
      )}
    </AnimatePresence>
  );
}
