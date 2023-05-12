import "./RecentReading.scss";
// libs
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { motion } from "framer-motion";
import { pageVariant, pageVariantRight } from "../../../pageVariants/variants";

export default function RecentReading() {
  const [recentBooks, setRecentBooks] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setRecentBooks(data[0]);
      });
  }, [token]);
  return (
    <motion.section
      className="recent-reading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      {recentBooks && recentBooks.length !== 0 ? (
        <>
          <motion.div
            className="recent-reading__left"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="recent-reading__top-left-wrapper">
              <h3 className="recent-reading__sub-heading">Continue Reading</h3>
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
                      Page {recentBooks.read_pages} of {recentBooks.total_pages}
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
          </motion.div>
          <motion.div
            className="recent-reading__right"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariantRight}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {recentBooks ? (
              <img
                src={recentBooks.cover_image}
                className="recent-reading__book-cover"
                alt="recent reading book cover"
              />
            ) : null}
          </motion.div>
        </>
      ) : (
        <h2>There's no book in your shelf...</h2>
      )}
    </motion.section>
  );
}
