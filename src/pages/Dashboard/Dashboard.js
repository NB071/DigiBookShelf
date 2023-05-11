import "./Dashboard.scss";
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
import RecentReading from "../../components/DashboardComponents/RecentReading/RecentReading";
import Banner from "../../components/Banner/Banner";
import GenresPieChart from "../../components/DashboardComponents/GenresPieChart/GenresPieChart";
import NYTslider from "../../components/DashboardComponents/NYTslider/NYTslider";
import BookshelfSlider from "../../components/DashboardComponents/BookshelfSlider/Bookshelf";
import ManageCTAs from "../../components/DashboardComponents/MangeCTAs/ManageCTAs";
import TotalBooksCounter from "../../components/DashboardComponents/TotalBooksCounter/TotalBooksCounter";
import FinishedBooksCounter from "../../components/DashboardComponents/FinishedBooksCounter/FinishedBooksCounter";
import Footer from "../../components/DashboardComponents/Footer/Footer";
//icons - images

export default function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

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
          />
          <Header
            userAvatar={userInfo.avatar_image}
            username={`${userInfo.first_name} ${userInfo.last_name}`}
            menuToggle={handleLogoClick}
          />
          <main className="dashboard">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} />

            {/* Recent reading */}
            <RecentReading />

            {/* small components*/}
            <TotalBooksCounter />
            <GenresPieChart />
            <FinishedBooksCounter />

            {/* Banner */}
            <Banner />

            {/* #15 NYT  */}
            <NYTslider />

            {/* Books to read */}
            <BookshelfSlider />

            {/* Manage CTAs */}
            <ManageCTAs />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
