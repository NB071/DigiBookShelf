import "./Manage.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import PendingBooksSlider from "../../components/ManageComponents/PendingBooksSlider/PendingBooksSlider";
import AddReading from "../../components/ManageComponents/AddReading/AddReading";
import SideBooklist from "../../components/ManageComponents/SideBooklist/SideBooklist"; 
import Footer from "../../components/Footer/Footer";

//icons - images

export default function Manage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [recentBooks, setRecentBooks] = useState(null)
  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
      axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setRecentBooks(data);
        
      });
  }, [navigate, token]);
  return (
    <AnimatePresence>
      {!userInfo || !recentBooks ? (
        <Loading key="loading" />
      ) : (
        <>
          <MobileMenu
            key="mobileMenu"
            Toggle={handleLogoClick}
            isMenuOpen={isMenuOpen}
            userInfo={userInfo}
          />
          <Header
            userAvatar={userInfo.avatar_image}
            username={`${userInfo.first_name} ${userInfo.last_name}`}
            menuToggle={handleLogoClick}
          />
          <main className="manage">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} />
            
            {/* First slider of all recent books in descending order */}
            <PendingBooksSlider recentBooks={recentBooks} />
            
            {/* Add reading */}
            <AddReading />
            
            {/* right side component */}
          <SideBooklist recentBooks={recentBooks} />

          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
