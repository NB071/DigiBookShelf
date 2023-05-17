import "./SideBooklistRemove.scss";
import "react-circular-progressbar/dist/styles.css";

// libs
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSnackbar } from "notistack";
import axios from "axios";

// icons
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

//svgs
import NotFound from "../../../assets/icons/NotFound.svg";

export default function SideBooklistRemove({
  recentBooks,
  token,
  triggerRerender,
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const handleSelectedBook = (book) => {
    setSelectedBook(book);
  };

  const openModal = () => {
    setOpenEditModal(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setOpenEditModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleDelete = async (book) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/books/`, {
        headers: { Authorization: `bearer ${token}` },
        data: {
          book_id: book,
        },
      });
      enqueueSnackbar("Success", {
        variant: "success",
        style: {
          backgroundColor: "#578C7A",
          height: "4rem",
          borderRadius: "18px",
        },
      });
      triggerRerender();
    } catch (error) {
      enqueueSnackbar("Failure", {
        variant: "error",
        style: {
          backgroundColor: "#eb4343",
          height: "4rem",
          borderRadius: "18px",
        },
      });
    }
  };

  return (
    <motion.section
      className="side-booklist-remove"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <h2 className="side-booklist-remove__heading">Remove a book</h2>
      <button
        className="side-booklist-remove__CTA"
        type="button"
        onClick={openModal}
      >
        <LocalLibraryIcon /> Browse
      </button>

      {openEditModal && (
        <AnimatePresence>
          <motion.div
            onClick={closeModal}
            className="remove-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            key="modal"
          >
            <div
              className="remove-modal__box"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CloseRoundedIcon
                onClick={closeModal}
                className="remove-modal__close-icon"
              />
              <div className="remove-modal__content">
                <form>
                  <div className="remove-modal__heading-wrapper">
                    <DeleteOutlineIcon className="remove-modal__edit-icon" />
                    <h2 className="remove-modal__heading">Remove a book</h2>
                  </div>
                </form>
                <div className="remove-modal__cards-wrapper">
                  {recentBooks.length !== 0 ? (
                    <div className="remove-modal__preview-card-container">
                      {recentBooks.map((book, index) => (
                        <motion.article
                          initial="initial"
                          animate="in"
                          exit={{ x: -200 }}
                          variants={fadeInVariant}
                          transition={{ duration: 0.7, delay: `1.${index}` }}
                          onClick={() => {
                            handleSelectedBook(book);
                            handleDelete(book.book);
                          }}
                          className={`remove-modal__preview-card ${
                            +book.read_pages === +book.total_pages &&
                            +book.total_pages !== 0
                              ? "remove-modal__preview-card--finished"
                              : ""
                          } ${
                            selectedBook.id === book.id
                              ? +selectedBook.read_pages ===
                                  +selectedBook.total_pages &&
                                +selectedBook.total_pages !== 0
                                ? "remove-modal__preview-card--active-finished"
                                : "remove-modal__preview-card--active-pending"
                              : ""
                          }`}
                          key={book.id}
                        >
                          <img
                            src={book.cover_image}
                            className="remove-modal__preview-card-image"
                            alt={`${book.book_name} book`}
                          />
                          <DeleteOutlineIcon className="remove-modal__trash-icon" />
                          <div className="remove-modal__preview-card-right">
                            <p className="remove-modal__preview-card-text">
                              <span className="remove-modal__preview-card-criteria">
                                Title:
                              </span>{" "}
                              {book.book_name}
                            </p>
                            <p className="remove-modal__preview-card-text">
                              <span className="remove-modal__preview-card-criteria">
                                Genre:
                              </span>{" "}
                              {book.genre}
                            </p>
                            <p className="remove-modal__preview-card-text">
                              <span className="remove-modal__preview-card-criteria">
                                Description:
                              </span>{" "}
                              {book.description}
                            </p>
                            <p className="remove-modal__preview-card-text">
                              <span className="remove-modal__preview-card-criteria">
                                Pages:
                              </span>{" "}
                              {`${book.read_pages} / ${book.total_pages} ${
                                +book.total_pages === +book.read_pages &&
                                +book.total_pages !== 0
                                  ? "(Finished)"
                                  : ""
                              } `}
                            </p>
                          </div>
                          <div className="remove-modal__preview-card-progress">
                            <CircularProgressbar
                              circleRatio={0.6}
                              className="remove-modal__progress-bar"
                              strokeWidth={12}
                              styles={buildStyles({
                                rotation: 1 / 8 + 1 / 2,
                                strokeLinecap: "butt",
                                trailColor: "#f3f3f3e0",
                                pathColor:
                                  +book.read_pages === +book.total_pages
                                    ? `#578C7A`
                                    : `rgba(105, 54, 245)`,
                              })}
                              value={
                                book.total_pages === 0
                                  ? 0
                                  : (
                                      (book.read_pages / book.total_pages) *
                                      100
                                    ).toFixed(0)
                              }
                            />
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <>
                      <img
                        src={NotFound}
                        className="remove-modal__not-found-voctor"
                        alt="not found vector"
                      />
                      <p>No book to remove...</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="remove-modal__overlay"></div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.section>
  );
}
