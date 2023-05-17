import "./MyShelf.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import BooksToRead from "../../components/MyShelfComponents/BooksToRead/BooksToRead";
import GoalSetChart from "../../components/MyShelfComponents/GoalSetChart/GoalSetChart";
import Footer from "../../components/Footer/Footer";
import ShelfBooks from "../../components/MyShelfComponents/ShelfBooks/ShelfBooks";
import FinishedBooksGallery from "../../components/MyShelfComponents/FinishedBooksGallery/FinishedBooksGallery";
import Activities from "../../components/MyShelfComponents/Activities/Activities";

//icons - images
export default function MyShelf({ token, handleLogout, userInfo, userBooks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AnimatePresence>
      {!userInfo || !userBooks ? (
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
            userBooks={userBooks}
          />
          <main className="my-shelf">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout} />

            {/* Pending books slider */}
            <BooksToRead token={token}  />

            {/* Goal set semi circle */}
            <GoalSetChart token={token} goalset={userInfo.goal_set} />

            {/* Shelf books */}
            <ShelfBooks userBooks={userBooks} token={token} />

            {/* finished books cards */}
            <FinishedBooksGallery token={token} />

            <Activities token={token}/>
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
