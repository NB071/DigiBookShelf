import "./Header.scss";

// libs
import { motion } from "framer-motion";
import { pageVariant, slideVariant } from "../../pageVariants/variants";

// icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

// svgs
import Logo from "../../assets/logo/Logo.svg";

export default function Header({ userAvatar, username, menuToggle }) {
  return (
    <motion.header
      className="header"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <section className="header__left">
        <WidgetsRoundedIcon
          className="header__mobile-menu"
          onClick={menuToggle}
        />

        <img className="header__logo" src={Logo} alt="Logo" />
      </section>
      <section className="header__middle">
        <div className="header__searchbar-wrapper">
          <input
            type="search"
            className="header__search-input"
            placeholder="Search"
            name="searchbar"
          />
          <div className="header__search-icon-wrapper">
            <SearchRoundedIcon className="header__search-icon" />
          </div>
        </div>
      </section>
      <section className="header__right">
        <Brightness4RoundedIcon className="header__darkmode-icon" />
        <NotificationsNoneRoundedIcon className="header__ringbell-icon" />
        <div className="header__user-area">
          <img
            src={userAvatar}
            className="header__user-avatar"
            alt="user avatar"
          />
          <div className="header__user-info">
            <h3 className="header__username">{username}</h3>
            <p className="header__level">Level 1</p>
          </div>
        </div>
      </section>
    </motion.header>
  );
}
