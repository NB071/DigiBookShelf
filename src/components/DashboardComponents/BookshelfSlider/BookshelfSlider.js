import "./BookshelfSlider.scss";
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

//svgs
import NotFound from "../../../assets/icons/NotFound.svg"
export default function BookshelfSlider({token}) {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=1`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setRecommendation(data);
      });
  }, [token]);
  
  if (!recommendation) {
    return null;
  }
  return (
    <motion.section
      className="books-shelf"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 1 }}
    >
      <div className="books-shelf__left">
        <h2 className="books-shelf__heading">Books to Read</h2>
      </div>

      <div className="books-shelf__right-container">
        <div className="books-shelf__right">
          {recommendation.length !== 0 ? (
            <Swiper
              className={"books-shelf__slider-wrapper"}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={8}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
            >
              {recommendation &&
                recommendation.map((book) => (
                  <SwiperSlide className="books-shelf__slide" key={book.book}>
                    <article key={book.id} className="books-shelf__book-card">
                      <img
                        src={book.cover_image}
                        alt={book.name}
                        title={book.name}
                      />
                      <div className="books-shelf__book-card-info">
                        <h3 className="books-shelf__book-title">
                          {book.book_name}
                        </h3>
                        <p className="books-shelf__book-description">
                          {book.description}
                        </p>
                        <Link
                          className="books-shelf__CTA"
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
            <>
            <img src={NotFound} className="books-shelf__not-found-vector" alt="" />
            <p className="books-shelf__not-found-text">Currently, there's no book in you're shelf...</p>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
