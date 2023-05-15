import "./ShelfBooks.scss";
import "react-circular-progressbar/dist/styles.css";

//libs
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";

// svgs
import RecentBookCircle from "../../../assets/icons/BannerCircleBackground.svg"

export default function ShelfBooks({ token }) {
  const [recentBook, setRecentBook] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=1?recent`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setRecentBook(data);
      });
  }, [token]);
  if (!recentBook) {
    return null;
  }
  return (
    <motion.section
      className="shelf-books"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="recent-book">
        <h2 className="recent-book__heading">Recent reading</h2>
        <div className="recent-book__content">
          <img
            src={recentBook[0].cover_image}
            className="recent-book__cover-image"
            alt={`${recentBook[0].cover_image} cover`}
          />
          <div className="recent-book__info-wrapper">
            <span className="recent-book__progress-wrapper">
              <CircularProgressbar
                className="recent-book__progress-bar"
                strokeWidth={50}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  trailColor: "#f3f3f3e0",
                  pathColor: "#B2B7C5",
                })}
                value={
                  recentBook[0].total_pages === 0
                    ? 0
                    : (
                        (recentBook[0].read_pages / recentBook[0].total_pages) *
                        100
                      ).toFixed(0)
                }
              />
              {recentBook[0].read_pages} of {recentBook[0].total_pages}
            </span>
            <p className="recent-book__author">
              <span className="recent-book__book-criteria">Author:</span>{" "}
              {recentBook[0].author}
            </p>
            <p className="recent-book__description">
              <span className="recent-book__book-criteria">Description: </span>
              {recentBook[0].description}
            </p>
            <Link to="/manage" className="recent-book__CTA">Manage</Link>
          </div>
          <img src={RecentBookCircle} className="recent-book__circle-backhround" alt="" />
        </div>
      </div>
      <div></div>
      
    </motion.section>
  );
}
