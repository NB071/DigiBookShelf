import "./NYTslide.scss";
import "swiper/css";
import "swiper/css/effect-cards";

// libs
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { EffectCards } from "swiper";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NYTslider({token}) {
  const [NYTbooks, setNYTbooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/nyt-best-seller`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setNYTbooks(data);
      });
  }, [token]);

  if (!NYTbooks) {
    return null;
  }

  return (
    <motion.section
      className="books-NYT"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <h2 className="books-NYT__heading">#15 New York Times</h2>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="books-NYT__slider-wrapper"
      >
        {NYTbooks.map((book) => (
          <SwiperSlide key={book.id} className="books-NYT__slide">
           <Link to={`/user/books/${book.id}`}>
            <img src={book.cover_image} alt={book.name} title={book.name} />
          </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
}
