import "./UserProfile.scss";

// libs
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Joyride from "react-joyride";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import CurrentUser from "../../components/UserProfileComponents/CurrentUser/CurrentUser";
import UserPrivacy from "../../components/UserProfileComponents/UserPrivacy/UserPrivacy";
import UserFriends from "../../components/UserProfileComponents/UserFriends/UserFriends";
import Footer from "../../components/Footer/Footer";

//icons - images
export default function UserProfile({
  token,
  handleLogout,
  userInfo,
  userBooks,
  socket,
  onlineFriends,
  notifications,
  setNotifications,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [joyrideActive, setJoyrideActive] = useState(false);

  const location = useLocation();

  // for mobile hamburger menu}
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const steps = [
    {
      target: ".header",
      title: "Header",
      content:
        "This is the header of the website where you can search, switch to dark theme or go to your userpanel",
      disableBeacon: true,
    },
    {
      target: ".side-menu",
      title: "Side Menu",
      content:
        "Here you can navigate, see your friends, our logout from the dashboard",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: ".nav",
      title: "Navigation bar",
      content: "Here you can navigate throughout the dashboard pages",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: ".side-menu__friends",
      title: "Friends",
      content: "If you have friends, their avatar will be shown here",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: ".side-menu__bottom",
      title: "Bottons",
      content: "Here you can replay the guide or logout from the page",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: ".user__avatar",
      title: "your avatar",
      content: "here is your avatar. In profile section you can click on it to change your avatar!",
      disableBeacon: true,
      placement: "right",
    },
    {
      target: ".user__links",
      title: "different navigation links",
      content: "you can navigate to different sections (profile, privacy, or friends) each will give you different panel",
      disableBeacon: true,
      placement: "right",
    },
  ];

  return (
    <AnimatePresence>
      {!userBooks || !userInfo || !socket ? (
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
            notifications={notifications}
            handleNotification={setNotifications}
            token={token}
          />
          <main className="user-profile">
          <Joyride
              steps={steps}
              run={joyrideActive}
              continuous={true}
              disableScrolling={true}
              styles={{
                spotlight: {
                  borderRadius: "18px",
                },
                buttonNext: {
                  backgroundColor: "#6936F5",
                  padding: ".75rem 1.75rem",
                  borderRadius: "18px",
                },
                buttonBack: {
                  color: "#eb4343",
                  padding: "0 1rem",
                },
                buttonClose: {
                  top: ".5rem",
                  right: ".5rem",
                },
                tooltip: {
                  borderRadius: "18px",
                  padding: "1.5rem 1.5rem",
                },
              }}
              callback={(data) => {
                if (data.action === "close" || data.status === "finished") {
                  setJoyrideActive(false);
                }
              }}
            />

            {/* side menu */}
            <SideMenu
              onlineFriends={onlineFriends}
              friends={userInfo.friends}
              handleLogout={handleLogout}
              setJoyrideActive={setJoyrideActive}
            />

            {location.pathname === "/user/profile" && (
              <CurrentUser userInfo={userInfo} token={token} />
            )}
            {location.pathname === "/user/privacy" && (
              <UserPrivacy
                userInfo={userInfo}
                token={token}
                handleLogout={handleLogout}
              />
            )}
            {location.pathname === "/user/friends" && (
              <UserFriends socket={socket} userInfo={userInfo} token={token} />
            )}
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
