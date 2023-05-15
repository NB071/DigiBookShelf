import "./Manage.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import PendingBooksSlider from "../../components/ManageComponents/PendingBooksSlider/PendingBooksSlider";
import AddReading from "../../components/ManageComponents/AddReading/AddReading";
import SideBooklistEdit from "../../components/ManageComponents/SideBooklistEdit/SideBooklistEdit";
import SideBooklistRemove from "../../components/ManageComponents/SideBooklistRemove/SideBooklistRemove";
import SideShareReading from "../../components/ManageComponents/SideShareReading/SideShareReading";
import Footer from "../../components/Footer/Footer";

export default function Manage({setRerenderFlag, rerenderFlag, userBooks, userInfo, token, handleLogout }) {
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
          <main className="manage">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout} />

            {/* First slider of all recent books in descending order */}
            <PendingBooksSlider recentBooks={userBooks} />

            {/* Add reading */}
            <AddReading
              triggerRerender={() => setRerenderFlag(!rerenderFlag)}
              token={token}
            />

            {/* right side edit books */}
            <SideBooklistEdit
              recentBooks={userBooks}
              token={token}
              triggerRerender={() => setRerenderFlag(!rerenderFlag)}
            />

            {/* right side remove books */}
            <SideBooklistRemove
              recentBooks={userBooks}
              token={token}
              triggerRerender={() => setRerenderFlag(!rerenderFlag)}
            />

            {/* right side share reading CTA */}
            <SideShareReading
              triggerRerender={() => setRerenderFlag(!rerenderFlag)}
            />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
