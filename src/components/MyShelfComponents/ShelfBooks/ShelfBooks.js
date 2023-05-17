import "./ShelfBooks.scss";
import "react-circular-progressbar/dist/styles.css";

//libs
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// svgs
import RecentBookCircle from "../../../assets/icons/BannerCircleBackground.svg";
import NotFound from "../../../assets/icons/NotFound2.svg"

export default function ShelfBooks({ userBooks }) {
console.log(userBooks);
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
        <h2 className="recent-book__heading">Recent Activity</h2>
        {userBooks?.[0] ? (
          <div className="recent-book__content">
            <img
              src={userBooks[0].cover_image}
              className="recent-book__cover-image"
              alt={`${userBooks[0].cover_image} cover`}
            />
            <div className="recent-book__info-wrapper">
              <span className={`recent-book__progress-wrapper ${+userBooks[0].total_pages === +userBooks[0].read_pages ? "recent-book__progress-wrapper--finished": ""}`}>
                <CircularProgressbar
                  className="recent-book__progress-bar"
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                    trailColor: `#f3f3f3e0`,
                    pathColor: +userBooks[0].total_pages === +userBooks[0].read_pages
                    ? "#578C7A"
                    : "#B2B7C5",
                  })}
                  value={
                    userBooks[0].total_pages === 0
                      ? 0
                      : (
                          (+userBooks[0].read_pages /
                            +userBooks[0].total_pages) *
                          100
                        ).toFixed(0)
                  }
                />
                {userBooks[0].read_pages} of {userBooks[0].total_pages} {+userBooks[0].total_pages === +userBooks[0].read_pages ? "(Finished)" : ""}
              </span>
              <p className="recent-book__author">
                <span className="recent-book__book-criteria">Author:</span>{" "}
                {userBooks[0].author}
              </p>
              <p className="recent-book__description">
                <span className="recent-book__book-criteria">
                  Description:{" "}
                </span>
                {userBooks[0].description}
              </p>
              <Link to="/manage" className="recent-book__CTA">
                Manage
              </Link>
            </div>
            <img
              src={RecentBookCircle}
              className="recent-book__circle-backhround"
              alt="background circle"
            />
          </div>
        ) : (
          <>
          <img src={NotFound} className="recent-book__not-found-vector" alt="" />
          <p>no book found on your shelf</p>
          </>
        )}
      </div>
    </motion.section>
  );
}
