import "./RecentReading.scss";

// libs
import { motion } from "framer-motion";
import { pageVariant, pageVariantRight } from "../../../pageVariants/variants";
import { Link } from "react-router-dom";
//svgs
import Lost from "../../../assets/icons/Lost.svg";

export default function RecentReading({ recentBook, token }) {
  return (
    <motion.section
      className="recent-reading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      {recentBook && recentBook.length !== 0 ? (
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
                {recentBook.book_name}
              </h2>
            </div>
            
            <p className="recent-reading__book-description">
              {recentBook.description}
            </p>
            <div className="recent-reading__bottom">
              <Link to={`/user/books/${recentBook.book}`} className="recent-reading__CTA">
                Read Now
              </Link>
              <div className="recent-reading__dot-wrapper">
                <span className="recent-reading__dot"></span>
                <span className="recent-reading__page-info">
                  Page {recentBook.read_pages} of {recentBook.total_pages}
                </span>
              </div>
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
            {recentBook ? (
              <img
                src={recentBook.cover_image}
                className="recent-reading__book-cover"
                alt="recent reading book cover"
              />
            ) : null}
          </motion.div>
        </>
      ) : (
        <>
        <img src={Lost} className="recent-reading__not-found-vector" alt="Not found vector" />
        <h2>There's no book in your shelf...</h2>
        </>
      )}
    </motion.section>
  );
}
