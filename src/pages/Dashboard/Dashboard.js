import "./Dashboard.scss";

// libs
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Joyride from "react-joyride";

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

export default function Dashboard({
  token,
  userInfo,
  userBooks,
  handleLogout,
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
      target: ".recent-reading",
      title: "Recent Reading",
      content: "This section displays your recent reading activity.",
      disableBeacon: true,
    },
    {
      target: ".genres-piechart",
      title: "Your favorite book gernes",
      content:
        "Here you can see the most popular generes that you read so far respectively.",
      disableBeacon: true,
    },
    {
      target: ".books-NYT",
      title: "Top 15 books from New York Times (best sellers)",
      content:
        "Top 15 weekly books from NYT is shown by this card-like slider. you can click on each to get an information about each of them",
      disableBeacon: true,
    },
    {
      target: ".Total-books",
      title: "All books in your shelf",
      content:
        "You can see all the books that you have currently on your shelf",
      disableBeacon: true,
      disableScrolling: false,
    },
    {
      target: ".finished-books",
      title: "Finished books in your shelf",
      content:
        "You can see all the books that you have currently finished on your shelf",
      disableScrolling: false,
      disableBeacon: true,
    },
    {
      target: ".manage-CTA",
      title: "Manage section",
      content:
        "You can see 3 options at your hands to manage your books (add, edit, or delete)",
      disableScrolling: false,
      disableBeacon: true,
    },
    {
      target: ".books-shelf",
      title: "Pending books",
      content: "Here You can see what book you havent finished yet!",
      disableScrolling: false,
      disableBeacon: true,
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
          <main className="dashboard">
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

            {/* Recent reading */}
            <RecentReading recentBook={userBooks[0]} token={token} />

            {/* small components*/}
            <TotalBooksCounter token={token} />
            <GenresPieChart token={token} />
            <FinishedBooksCounter userBooks={userBooks} />

            {/* Banner */}
            <Banner />

            {/* #15 NYT  */}
            <NYTslider token={token} />

            {/* Books to read */}
            <BookshelfSlider token={token} />

            {/* Manage CTAs */}
            <ManageCTAs />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
