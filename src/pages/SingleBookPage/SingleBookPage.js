import "./SingleBookPage.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";
import SingleBookInfo from "../../components/SingleBookInfo/SingleBookInfo";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

//icons - images
export default function SingleBookPage({
  token,
  setRerenderFlag,
  rerenderFlag,
  handleLogout,
  userInfo,
  userBooks,
  onlineFriends
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [isInShelf, setIsInShelf] = useState(null);
  // for mobile hamburger menu}
  const { book_id } = useParams();
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/books/${book_id}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setBookData(data);
        userBooks.find((book) => book.book === data.id)
          ? setIsInShelf(true)
          : setIsInShelf(false);
      });
  }, [token, book_id, userBooks, rerenderFlag]);

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
          />
          <main className="single-book">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} handleLogout={handleLogout} onlineFriends={onlineFriends}/>

            <SingleBookInfo
              isInShelf={isInShelf}
              bookData={bookData}
              userBooks={userBooks}
              token={token}
              triggerRerender={() => setRerenderFlag(!rerenderFlag)}
            />
          </main>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
