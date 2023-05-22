import "./Manage.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/effect-cards";

// libs
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Joyride from "react-joyride";

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

export default function Manage({
  setRerenderFlag,
  rerenderFlag,
  userBooks,
  userInfo,
  token,
  handleLogout,
  onlineFriends,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [joyrideActive, setJoyrideActive] = useState(false);

  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!token) {
    navigate("/login");
  }

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
      target: ".recent-added",
      title: "List of you books in recent order",
      content:
        "With the help of this slider you can see you recent books you added or changed. or disappears when deleted",
      disableBeacon: true,
    },
    {
      target: ".add-reading",
      title: "Add a book",
      content:
        "Within this box you can add a book to your shelf with its relevant data",
      disableBeacon: true,
    },
    {
      target: ".side-booklist-remove",
      title: "Remove a book",
      content:
        "If a book doesn't excite you, you can remove it from your shelf",
      disableBeacon: true,
    },
    {
      target: ".side-booklist-edit",
      title: "Edit an existing book",
      content:
        "You can see all the books that you have currently and be able to edit them",
      disableScrolling: false,
      disableBeacon: true,
    },
    {
      target: ".side-share-reading",
      title: "Share reading (Soon)",
      content:
        "You can see all the books that your friends have and interact with them or give them suggestions",
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
          />
          <main className="manage">
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
              friends={userInfo.friends}
              setJoyrideActive={setJoyrideActive}
              handleLogout={handleLogout}
              onlineFriends={onlineFriends}
            />

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
