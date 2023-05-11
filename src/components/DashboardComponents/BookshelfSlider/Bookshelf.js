import "./BookshelfSlider.scss";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

// import required modules
import { EffectCoverflow } from "swiper";

export default function BookshelfSlider() {
  const [recommendation, setRecommendation] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        console.log(data);
        setRecommendation(data);
      });
  }, [token]);
  if (!recommendation) {
    return null;
  }
  return (
    <section className="books-shelf">
      <div className="books-shelf__left">
        <h2 className="books-shelf__heading">Books to Read</h2>
      </div>

      <div className="books-shelf__right-container">
        <div className="books-shelf__right">
          <Swiper
            className={"books-shelf__slider-wrapper"}
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
            {recommendation &&
              recommendation.map((book) => (
                <SwiperSlide key={book.id} className="books-shelf__slide">
                  <img
                    src={book.cover_image}
                    alt={book.name}
                    title={book.name}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
