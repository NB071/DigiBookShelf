import "./Header.scss";

// libs
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import { pageVariant } from "../../pageVariants/variants";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

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
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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
          {dropdownVisible && searchResults.length > 0 && (
            <div ref={dropdownRef} className="header__dropdown">
              {searchResults.map((result, index) => (
                <Link to={`/user/books/${result.book}`}>
                  <div
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="header__right">
        <Brightness4RoundedIcon
          className="header__darkmode-icon"
        />
        <NotificationsNoneRoundedIcon className="header__ringbell-icon" />
        <div className="header__user-area">
          <img
            src={userAvatar}
            className="header__user-avatar"
            alt="user avatar"
          />
          <div className="header__user-info">
            <h3 className="header__username">{username}</h3>
            <p className="header__level">Level 4</p>
          </div>
        </div>
      </section>
    </motion.header>
  );
}
