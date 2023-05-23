import "./UserProfile.scss";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import CurrentUser from "../../components/UserProfileComponents/CurrentUser/CurrentUser";
import Footer from "../../components/Footer/Footer";

//icons - images
export default function UserProfile({
  token,
  setRerenderFlag,
  rerenderFlag,
  handleLogout,
  userInfo,
  userBooks,
  onlineFriends
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // for mobile hamburger menu}
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AnimatePresence>
      {!userBooks || !userInfo ? (
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
          <main className="user-profile">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout} onlineFriends={onlineFriends}/>

            
            <CurrentUser userInfo={userInfo} token={token}  triggerRerender={() => setRerenderFlag(!rerenderFlag)}/>
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
