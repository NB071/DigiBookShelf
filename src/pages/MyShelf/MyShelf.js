import "./MyShelf.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

// libs
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Joyride from "react-joyride";

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
export default function MyShelf({
  token,
  handleLogout,
  userInfo,
  userBooks,
  onlineFriends,
  notifications,
  setNotifications,
  socket
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [joyrideActive, setJoyrideActive] = useState(false);

  // for mobile hamburger menu
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
      target: ".books-pending",
      title: "List of your pending books",
      content:
        "With the help of this slider you can see you recent books you added or changed. or disappears when deleted",
      disableBeacon: true,
    },
    {
      target: ".goalset",
      title: "Goalset",
      content:
        "Within this box you can see your annual goal and how much you've accomplished",
      disableBeacon: true,
    },
    {
      target: ".shelf-books",
      title: "Recent Activities",
      content:
        "Kind of similar to the dashboard component you can track what you had been doing",
      disableBeacon: true,
    },
    {
      target: ".user-activity",
      title: "You progress activity",
      content: "You can see the trend of your activity",
      disableScrolling: false,
      disableBeacon: true,
    },
    {
      target: ".done-reading",
      title: "Finished books",
      content: "All the books you finish will go inside this box",
      disableBeacon: true,
      disableScrolling: false,
    },
  ];

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
            notifications={notifications}
            handleNotification={setNotifications}
            token={token}
          />
          <main className="my-shelf">
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
              userInfo={userInfo}
              setJoyrideActive={setJoyrideActive}
              handleLogout={handleLogout}
              onlineFriends={onlineFriends}
              token={token}
              socket={socket}
            />

            {/* Pending books slider */}
            <BooksToRead token={token} />

            {/* Goal set semi circle */}
            <GoalSetChart token={token} goalset={userInfo.goal_set} />

            {/* Shelf books */}
            <ShelfBooks userBooks={userBooks} token={token} />

            {/* finished books cards */}
            <FinishedBooksGallery token={token} />

            <Activities token={token} />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
