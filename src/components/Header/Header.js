import "./Header.scss";

import { useState } from "react";

// icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded"; // images

import Logo from "../../assets/logo/Logo.svg";

export default function Header({ userAvatar, username, menuToggle }) {

  return (
    <header className="header">
      <section className="header__left">
        <div onClick={menuToggle}>
          <img className="header__logo-mobile" src={Logo} alt="Logo" />
        </div>
        <img className="header__logo" src={Logo} alt="Logo" />
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
        <Brightness4RoundedIcon
          style={{ fontSize: "2.5rem" }}
          className="header__darkmode-icon"
        />
        <NotificationsNoneRoundedIcon
          style={{ fontSize: "2.5rem" }}
          className="header__ringbell-icon"
        />
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
    </header>
  );
}
