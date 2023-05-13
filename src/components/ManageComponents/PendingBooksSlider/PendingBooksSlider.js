import "./PendingBooksSlider.scss";

//libs
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { pageVariant} from "../../../pageVariants/variants";

// Import Swiper styles
import "swiper/css";

export default function PendingBooksSlider({recentBooks}) {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  if (!recentBooks) {
    return null;
  }
  return (
    <motion.section
      className="recent-added"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      {recentBooks[currentSlideIndex] && (
        <div
          className="recent-added__blur-overlay"
          style={{
            backgroundImage: `url(${recentBooks[currentSlideIndex].cover_image})`,
          }}
        ></div>
      )}
      <div className="recent-added__left">
        <h2 className="recent-added__heading">Readings</h2>
      </div>
      <div className="recent-added__right-container">
        <div className="recent-added__right">
          {recentBooks.length !== 0 ? (
            <Swiper
              className={"recent-added__slider-wrapper"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={4}
              onSlideChangeTransitionEnd={handleSlideChange}
            >
              {recentBooks &&
                recentBooks.map((book, index) => (
                  <SwiperSlide
                    className={`recent-added__slide ${
                      index !== currentSlideIndex
                        ? "recent-added__non-selected"
                        : "recent-added__selected"
                    }`}
                    key={book.id}
                  >
                    <article>
                      <img
                        className="recent-added__cover-image"
                        src={book.cover_image}
                        alt={book.book_name}
                        title={book.book_name}
                      />
                      <div className="recent-added__book-card-info">
                        <h3 className="recent-added__book-title">
                          {book.book_name}
                        </h3>

                        <Link
                          className="recent-added__CTA"
                          to={`/user/books/${book.book}`}
                        >
                          More info
                        </Link>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <p>Currently, there's no book in you're shelf...</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
