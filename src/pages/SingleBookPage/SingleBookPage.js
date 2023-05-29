import "./SingleBookPage.scss";

// libs
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Joyride from "react-joyride";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import SingleBookInfo from "../../components/SingleBookInfo/SingleBookInfo";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default function SingleBookPage({
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
  const [isInShelf, setIsInShelf] = useState(false);
  const [joyrideActive, setJoyrideActive] = useState(false);
  const { book_id } = useParams();

  const navigate = useNavigate()
  const queryClient = useQueryClient();

  // for mobile menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: bookData } = useQuery(
    ["book", book_id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/books/${book_id}`,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      return response.data;
    },
    
    {
      onSuccess: () => {
        queryClient.refetchQueries("userBooks");
      },
      onError: (error) => {
        navigate("/not-found")
      },
    }
  );
  useEffect(() => {
    if (
      bookData &&
      userBooks &&
      userBooks.find((book) => book.book === bookData.id)
    ) {
      setIsInShelf(true);
    } else {
      setIsInShelf(false);
    }
  }, [bookData, userBooks]);

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
      target: ".book__left",
      title: "Book preview",
      content:
        "Here you can see the book's cover with actions depending on whether its on your shelf or not.",
      disableBeacon: true,
    },
    {
      target: ".book__right",
      title: "Book's information",
      content: "here is your all the book's information",
      disableBeacon: true,
    },
    {
      target: ".book__in-shelf",
      title: "book is on your shelf?",
      content: "this shows you wether the book is on your shelf or not",
      disableBeacon: true,
    },
  ];

  return (
    <AnimatePresence>
      {!userBooks || !userInfo || !bookData ? (
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
          <main className="single-book">
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
              handleLogout={handleLogout}
              onlineFriends={onlineFriends}
              setJoyrideActive={setJoyrideActive}
              token={token}
              socket={socket}
            />

            <SingleBookInfo
              isInShelf={isInShelf}
              bookData={bookData}
              token={token}
              userBooks={userBooks}
            />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
