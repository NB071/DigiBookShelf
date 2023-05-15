import "./MyShelf.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import BooksToRead from "../../components/MyShelfComponents/BooksToRead/BooksToRead";
import Footer from "../../components/Footer/Footer";

//icons - images
export default function MyShelf({token, handleLogout, userInfo}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!token) {
    navigate("/login");
  }
  
  return (
    <AnimatePresence>
      {!userInfo ? (
        <Loading key="loading" />
      ) : (
        <>
          <MobileMenu
            key="mobileMenu"
            Toggle={handleLogoClick}
            isMenuOpen={isMenuOpen}
            userInfo={userInfo}
            handleLogout={handleLogout}
          />
          <Header
            userAvatar={userInfo.avatar_image}
            username={`${userInfo.first_name} ${userInfo.last_name}`}
            menuToggle={handleLogoClick}
          />
          <main className="dashboard">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout}/>

          {/* Pending books slider */}
            <BooksToRead token={token}/>
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
