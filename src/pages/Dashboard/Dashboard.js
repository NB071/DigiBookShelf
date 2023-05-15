import "./Dashboard.scss";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import SideMenu from "../../components/SideMenu/SideMenu";
import RecentReading from "../../components/DashboardComponents/RecentReading/RecentReading";
import Banner from "../../components/Banner/Banner";
import GenresPieChart from "../../components/DashboardComponents/GenresPieChart/GenresPieChart";
import NYTslider from "../../components/DashboardComponents/NYTslider/NYTslider";
import BookshelfSlider from "../../components/DashboardComponents/BookshelfSlider/BookshelfSlider";
import ManageCTAs from "../../components/DashboardComponents/MangeCTAs/ManageCTAs";
import TotalBooksCounter from "../../components/DashboardComponents/TotalBooksCounter/TotalBooksCounter";
import FinishedBooksCounter from "../../components/DashboardComponents/FinishedBooksCounter/FinishedBooksCounter";
import Footer from "../../components/Footer/Footer";

export default function Dashboard({ token, userInfo, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!userInfo) {
    return <Loading/>
  }
  return (
    <AnimatePresence>
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
        <SideMenu friends={userInfo.friends} handleLogout={handleLogout} />

        {/* Recent reading */}
        <RecentReading token={token}/>

        {/* small components*/}
        <TotalBooksCounter token={token}/>
        <GenresPieChart token={token}/>
        <FinishedBooksCounter token={token}/>

        {/* Banner */}
        <Banner />

        {/* #15 NYT  */}
        <NYTslider token={token} />

        {/* Books to read */}
        <BookshelfSlider token={token}/>

        {/* Manage CTAs */}
        <ManageCTAs />
      </main>
      <Footer />
    </AnimatePresence>
  );
}
