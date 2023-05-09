import "./Dashboard.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";

// components
import Header from "../../components/Header/Header";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Loading from "../../components/Loading/Loading";
import SideMenu from "../../components/SideMenu/SideMenu";

//icons

export default function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recentBooks, setRecentBooks] = useState();
  // for mobile hamburger menu
  const handleLogoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setUserInfo(data);
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then(({ data }) => {
            setRecentBooks(data);
            console.log(data);
          });
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <AnimatePresence>
      {!userInfo ? (
        <Loading key="loading" />
      ) : (
        <>
          <MobileMenu
            key="mobileMenu"
            Toggle={handleLogoClick}
            isMenuOpen={isMenuOpen}
            userInfo={userInfo}
          />
          <Header
            userAvatar={userInfo.avatar_image}
            username={`${userInfo.first_name} ${userInfo.last_name}`}
            menuToggle={handleLogoClick}
          />
          <main className="dashboard">
            {/* side menu */}
            <SideMenu friends={userInfo.friends} />
            <section className="recent-reading">
              <div className="recent-reading__left">
                <div className="recent-reading__top-left-wrapper">
                  <h3 className="recent-reading__sub-heading">
                    Continue Reading
                  </h3>
                  <h2 className="recent-reading__book-name">
                    {recentBooks ? (
                      recentBooks.book_name
                    ) : (
                      <Skeleton width={200} height={24} />
                    )}
                  </h2>
                </div>
                <p className="recent-reading__book-description">
                  {recentBooks ? (
                    recentBooks.description
                  ) : (
                    <Skeleton count={3} width={300} height={12} />
                  )}
                </p>
                <div className="recent-reading__bottom">
                  {recentBooks ? (
                    <>
                      <button type="button" className="recent-reading__CTA">
                        Read Now
                      </button>
                      <div className="recent-reading__dot-wrapper">
                        <span className="recent-reading__dot"></span>
                        <span className="recent-reading__page-info">
                          Page {recentBooks.read_pages} of{" "}
                          {recentBooks.total_pages}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Skeleton width={120} height={36} borderRadius={18} />
                      <Skeleton width={8} height={8} />
                      <Skeleton width={100} height={18} borderRadius={18} />
                    </>
                  )}
                </div>
              </div>
              <div className="recent-reading__right">
                {recentBooks ? (
                  <img
                    src={recentBooks.cover_image}
                    className="recent-reading__book-cover"
                    alt="recent reading book cover"
                  />
                ) : (
                  null
                )}
              </div>
            </section>
            <section className="book-options">
            <section className="banner"></section>
              <div className="NYT-books"></div>
              <div className="user-reading"></div>
            </section>
            <section className="manage-CTA"></section>
          </main>
        </>
      )}
    </AnimatePresence>
  );
}
