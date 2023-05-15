import "./BooksToRead.scss";
import "swiper/css";
import "swiper/css/effect-coverflow";

//libs
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { EffectCoverflow } from "swiper";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import axios from "axios";

export default function BooksToRead({token}) {
  const [bookToRead, setBookToRead] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=1`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setBookToRead(data);
      });
  }, [token]);
  if (!bookToRead) {
    return null;
  }
  return (
    <motion.section
      className="books-pending"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 1 }}
    >
      <div className="books-pending__left">
        <h2 className="books-pending__heading">Books to Read</h2>
      </div>

      <div className="books-pending__right-container">
        <div className="books-pending__right">
          {bookToRead.length !== 0 ? (
            <Swiper
              className={"books-pending__slider-wrapper"}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
            >
              {bookToRead &&
                bookToRead.map((book) => (
                  <SwiperSlide className="books-pending__slide">
                    <article key={book.id} className="books-pending__book-card">
                      <img
                        src={book.cover_image}
                        alt={book.name}
                        title={book.name}
                      />
                      <div className="books-pending__book-card-info">
                        <h3 className="books-pending__book-title">
                          {book.book_name}
                        </h3>
                        <p className="books-pending__book-description">
                          {book.description}
                        </p>
                        <Link
                          className="books-pending__CTA"
                          to={`/user/books/${book.book}`}
                        >
                          {" "}
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
