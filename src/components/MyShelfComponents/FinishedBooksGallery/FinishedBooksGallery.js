import "./FinishedBooksGallery.scss";

//libs
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import axios from "axios";
import Wave from "react-wavify";

// svgs
import RecentBookCircle from "../../../assets/icons/BannerCircleBackground.svg";
import EmptyShelf from "../../../assets/icons/EmptyShelf.svg";

// icons
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function FinishedBooksGallery({ token }) {
  const [doneBooks, setDoneBooks] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=0`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setDoneBooks(data);
        console.log(data);
      });
  }, [token]);

  return (
    <motion.section
      className="done-reading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <div className="done-reading__heading-wrapper">
        <h2 className="done-reading__heading">Finished books</h2>
        {doneBooks && doneBooks.length > 5 && (
          <Link to="/user/books/all-books" className="done-reading__see-more">
            See more
            <ArrowRightAltIcon />
          </Link>
        )}
      </div>
      <div className="done-reading__container">
        {doneBooks && doneBooks.length !== 0 ? (
          doneBooks.map(
            (book, index) =>
              index < 5 && (
                <Link to={`/user/books/${book.book}`}>
                  <article className="done-reading__card" key={book.id}>
                    <img
                      src={book.cover_image}
                      className="done-reading__card-image"
                      alt={`${book.book_name} cover`}
                    />
                    <div>
                      <h3 className="done-reading__card-title">
                        {book.book_name}
                      </h3>
                      <p className="done-reading__card-start-date">
                        Started: {book.created_at.split("T")[0]}
                      </p>
                      <p className="done-reading__card-finish-date">
                        Finished: {book.updated_at.split("T")[0]}
                      </p>
                    </div>
                    <img
                      src={RecentBookCircle}
                      className="done-reading__card-background-circle"
                      alt="background circle"
                    />
                  </article>
                </Link>
              )
          )
        ) : (
          <>
            <img
              src={EmptyShelf}
              className="done-reading__empty-shelf-vector"
              alt="empty shelf vector"
            />
            <p>Currently you haven't finished a book...</p>
          </>
        )}

        <Wave
          fill="#774af5"
          paused={false}
          options={{
            height: 40,
            amplitude: 20,
            speed: 0.6,
            points: 5,
          }}
          className="done-reading__background-wave"
        />
      </div>
      {/* <img
        src={WaveSvg}
        className="done-reading__background-wave"
        alt="background circle"
      /> */}
    </motion.section>
  );
}
