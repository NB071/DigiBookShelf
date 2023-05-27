import "./Header.scss";

// libs
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariant, pageVariantTop } from "../../pageVariants/variants";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Darkmode from "darkmode-js";

// components
import HeaderNotification from "../HeaderNotification/HeaderNotification";

// icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

// svgs
import Logo from "../../assets/logo/Logo.svg";
import CircleBackground from "../../assets/icons/BannerCircleBackground.svg";

export default function Header({
  userBooks,
  userAvatar,
  username,
  menuToggle,
  notifications,
  token,
  handleNotification
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const options = {
    mixColor: "#fff",
    backgroundColor: "#F1F2F9",
    buttonColorDark: "#6936F5",
    buttonColorLight: "#6936F5",
    saveInCookies: false,
    autoMatchOsTheme: false,
  };

  const darkmode = new Darkmode(options);
  const fuse = useMemo(() => {
    const options = {
      keys: ["book_name", "description", "author"],
    };

    if (userBooks) {
      return new Fuse(userBooks, options);
    }
    return null;
  }, [userBooks]);

  const handleSearch = (text) => {
    if (fuse && text.trim() !== "") {
      const results = fuse.search(text);
      setSearchResults(results.map((result) => result.item));
      setDropdownVisible(true);
    } else {
      setSearchResults([]);
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        event.target.className !== "header__ringbell-icon" &&
        !event.target.closest(".header__ringbell-icon")
      ) {
        setNotificationVisible((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
          />
          <div className="header__search-icon-wrapper">
            <SearchRoundedIcon className="header__search-icon" />
          </div>
          <AnimatePresence>
            {dropdownVisible && searchResults.length > 0 && (
              <motion.div
                ref={dropdownRef}
                className="header__dropdown"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariantTop}
                transition={{ duration: 0.3 }}
              >
                {searchResults.map((result, index) => (
                  <Link to={`/user/books/${result.book}`}>
                    <article
                      onClick={() => setDropdownVisible(false)}
                      key={index}
                      className={`header__dropdown-item ${
                        index !== searchResults.length - 1
                          ? "header__dropdown--border-bottom"
                          : ""
                      }`}
                    >
                      <h3>{index + 1}:</h3>
                      <img
                        src={result.cover_image}
                        className="header__dropdown-item-image"
                        alt={result.book_name}
                      />

                      <div className="header__dropdown-info-wrapper">
                        <p className="header__dropdown-item-info">
                          <span className="header__dropdown-item-criteria">
                            Name:
                          </span>{" "}
                          {result.book_name}
                        </p>
                        <p className="header__dropdown-item-info">
                          <span className="header__dropdown-item-criteria">
                            Author:
                          </span>{" "}
                          {result.author}
                        </p>
                        <p className="header__dropdown-item-info">
                          <span className="header__dropdown-item-criteria">
                            description:
                          </span>{" "}
                          {result.description}
                        </p>
                      </div>
                      <img
                        src={CircleBackground}
                        className="header__dropdown-circle-background"
                        alt=""
                      />
                    </article>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <section className="header__right">
        <Brightness4RoundedIcon
          onClick={() => darkmode.toggle()}
          className="header__darkmode-icon"
        />
        <div
          className={`header__notification-area ${
            notifications?.length > 0
              ? "header__notification-area--notify"
              : ""
          }`}
        >
          <NotificationsNoneRoundedIcon
            className="header__ringbell-icon"
            onClick={(e) => {
              e.stopPropagation();
              setNotificationVisible((prevState) => !prevState);
            }}
          />
          <AnimatePresence>
            {notificationVisible && (
              <HeaderNotification
                ref={notificationRef}
                notifications={notifications}
                handleNotification={handleNotification}
                token={token}
              />
            )}
          </AnimatePresence>
        </div>

        <Link to="/user/profile">
          <div className="header__user-area">
            <img
              src={userAvatar}
              className="header__user-avatar"
              alt="user avatar"
            />
            <div className="header__user-info">
              <h3 className="header__username">{username}</h3>
              <p className="header__level">
                Level{" "}
                {userBooks &&
                  Math.floor(
                    userBooks.filter((book) => book.is_pending === 0).length / 2
                  )}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </motion.header>
  );
}
