import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { EffectCards } from "swiper";
import "./NYTslide.scss";

import "swiper/css";
import "swiper/css/effect-cards";
import axios from "axios";

export default function NYTslider() {
  const [NYTbooks, setNYTbooks] = useState([]);
  const token = localStorage.getItem("token");

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
    <section className="books-NYT">
      <h2 className="books-NYT__heading">#15 New York Times</h2>
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="books-NYT__slider-wrapper">
        {NYTbooks.map((book) => (
          <SwiperSlide key={book.id} className="books-NYT__slide">
            <img src={book.cover_image} alt={book.name} title={book.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
