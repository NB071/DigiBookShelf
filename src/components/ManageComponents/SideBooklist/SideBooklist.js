import "./SideBooklist.scss";
import "react-circular-progressbar/dist/styles.css";

// libs
import { motion } from "framer-motion";
import { pageVariant, slideVariant } from "../../../pageVariants/variants";
import { useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// icons
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorIcon from "@mui/icons-material/Error";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import BookImagePlaceHolder from "../../../assets/icons/addedBookPlaceholder.svg";

export default function SideBooklist({ recentBooks }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const handleSelectedBook = (book) => {
    setSelectedBook(book);
    formik.setFieldValue("book_name", book.book_name);
    formik.setFieldValue("book_description", book.description);
    formik.setFieldValue("book_genre", book.genre);
    formik.setFieldValue("book_author", book.author);
    formik.setFieldValue("total_pages", book.total_pages);
    formik.setFieldValue("read_pages", +book.read_pages);
    formik.setFieldValue("cover_image_preview", book.cover_image);
  };
  const openModal = () => {
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setOpenEditModal(false);
  };
  const formik = useFormik({
    initialValues: {
      book_name: "",
      book_description: "",
      book_genre: "",
      book_author: "",
      total_pages: "",
      read_pages: 0,
      cover_image: "",
      cover_image_preview: "",
    },
    validationSchema: Yup.object({
      book_name: Yup.string().required("This field is required"),
      book_description: Yup.string().required("This field is required"),
      book_genre: Yup.string().required("This field is required"),
      book_author: Yup.string().required("This field is required"),
      total_pages: Yup.number()
        .integer("Required integer")
        .positive("Required Positive")
        .max(99999, "Long page number!")
        .required("This field is required"),
      read_pages: Yup.number()
        .integer("Required integer")
        .min(0, "Required Positive")
        .max(Yup.ref("total_pages"), "Value Exceeded total pages")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      //   const token = localStorage.getItem("token");
      //   try {
      //     const formData = new FormData();
      //     formData.append("book_name", values.book_name);
      //     formData.append("book_description", values.book_description);
      //     formData.append("book_genre", values.book_genre);
      //     formData.append("book_author", values.book_author);
      //     formData.append("total_pages", values.total_pages);
      //     formData.append("read_pages", values.read_pages);
      //     formData.append("cover_image", values.cover_image);
      //     const response = await axios.post(
      //       `${process.env.REACT_APP_API_URL}/api/user/books`, formData, {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     console.log(response);
      //   } catch (error) {
      //     console.log(error);
      //   }
    },
  });

  return (
    <section className="side-booklist">
      <h2 className="side-booklist__heading">Edit book information</h2>
      <button className="side-booklist__CTA" type="button" onClick={openModal}>
        <LocalLibraryIcon /> Browse
      </button>
      <AnimatePresence>
        {openEditModal && (
          <motion.div
            onClick={closeModal}
            className="edit-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0, x: -50 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="edit-modal__box"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CloseRoundedIcon
                onClick={closeModal}
                className="edit-modal__close-icon"
              />
              <div className="edit-modal__heading-wrapper">
                <EditRoundedIcon className="edit-modal__edit-icon" />
                <h2 className="edit-modal__heading">Edit</h2>
              </div>
              <div className="edit-modal__content">
                <div className="edit-modal__left">
                  <motion.div
                    className="edit-modal__book-name-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 0.8 }}
                  >
                    <label>
                      Book name
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.book_name && formik.errors.book_name
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="text"
                        name="book_name"
                        placeholder="Book name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.book_name}
                      />
                      {formik.touched.book_name && formik.errors.book_name ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.book_name}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>

                  {/* book desc input */}
                  <motion.div
                    className="edit-modal__book-description-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 0.9 }}
                  >
                    <label>
                      Book description
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.book_description &&
                          formik.errors.book_description
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="text"
                        name="book_description"
                        placeholder="Book description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.book_description}
                      />
                      {formik.touched.book_description &&
                      formik.errors.book_description ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.book_description}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>

                  {/* book genre input */}
                  <motion.div
                    className="edit-modal__book-genre-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1 }}
                  >
                    <label>
                      Book genre
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.book_genre && formik.errors.book_genre
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="text"
                        name="book_genre"
                        placeholder="Book genre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.book_genre}
                      />
                      {formik.touched.book_genre && formik.errors.book_genre ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.book_genre}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>
                  {/* book pages input */}
                  <motion.div
                    className="edit-modal__book-number-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1 }}
                  >
                    <label>
                      Read page no.
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.read_pages && formik.errors.read_pages
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="number"
                        name="read_pages"
                        placeholder="Read page number"
                        value={formik.values.read_pages}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.read_pages && formik.errors.read_pages ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.read_pages}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                    <span className="edit-modal__paegs-spliter"> / </span>
                    <label>
                      Total page no.
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.total_pages &&
                          formik.errors.total_pages
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="number"
                        name="total_pages"
                        placeholder="Page number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.total_pages}
                      />
                      {formik.touched.total_pages &&
                      formik.errors.total_pages ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.total_pages}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>
                  {/* author name input */}
                  <motion.div
                    className="edit-modal__book-author-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1.1 }}
                  >
                    <label>
                      Author name
                      <input
                        className={`edit-modal__input  ${
                          formik.touched.book_author &&
                          formik.errors.book_author
                            ? "edit-modal__input--invalid"
                            : ""
                        }`}
                        type="text"
                        name="book_author"
                        placeholder="author name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.book_author}
                      />
                      {formik.touched.book_author &&
                      formik.errors.book_author ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.book_author}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>

                  {/* thumbnail */}
                  <motion.div
                    className="edit-modal__thumbnail-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1.2 }}
                  >
                    <label>
                      Thumbnail
                      <img
                        className="edit-modal__cover-image"
                        src={`${
                          formik.values.cover_image_preview ||
                          BookImagePlaceHolder
                        }`}
                        alt="book cover preview"
                      />
                      {formik.touched.cover_image_preview &&
                      formik.errors.cover_image_preview ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.cover_image_preview}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>

                  {/* book cover file input */}
                  <motion.div
                    className="edit-modal__book-cover-wrapper"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1.2 }}
                  >
                    <label>
                      Book cover
                      <input
                        className="edit-modal__input-file"
                        type="file"
                        name="cover_image_preview"
                        accept="image/*"
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.cover_image_preview &&
                      formik.errors.cover_image_preview ? (
                        <motion.div
                          className="edit-modal__error"
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={slideVariant}
                          transition={{ duration: 0.7 }}
                        >
                          <ErrorIcon className="edit-modal__error-icon" />
                          <span className="edit-modal__error-msg">
                            {formik.errors.cover_image_preview}
                          </span>
                        </motion.div>
                      ) : null}
                    </label>
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div
                    className="edit-modal__CTAs"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariant}
                    transition={{ duration: 0.7, delay: 1.3 }}
                  >
                    <button className="edit-modal__CTA-button" type="submit">
                      Edit
                    </button>
                    <button
                      className="edit-modal__CTA-button edit-modal__CTA-button--cancel"
                      type="reset"
                    >
                      Reset
                    </button>
                  </motion.div>
                </div>
                <div className="edit-modal__right">
                  <div className="edit-modal__preview-card-container">
                    {recentBooks.map((book) => (
                      <article
                        onClick={() => handleSelectedBook(book)}
                        className={`edit-modal__preview-card ${
                          +book.read_pages === +book.total_pages &&
                          +book.total_pages !== 0
                            ? "edit-modal__preview-card--finished"
                            : ""
                        } ${
                          selectedBook.id === book.id
                            ? +selectedBook.read_pages ===
                                +selectedBook.total_pages &&
                              +selectedBook.total_pages !== 0
                              ? "edit-modal__preview-card--active-finished"
                              : "edit-modal__preview-card--active-pending"
                            : ""
                        }`}
                        key={book.id}
                      >
                        <img
                          src={book.cover_image}
                          className="edit-modal__preview-card-image"
                          alt={`${book.book_name} book`}
                        />
                        <div className="edit-modal__preview-card-right">
                          <p className="edit-modal__preview-card-text">
                            <span className="edit-modal__preview-card-criteria">
                              Title:
                            </span>{" "}
                            {book.book_name}
                          </p>
                          <p className="edit-modal__preview-card-text">
                            <span className="edit-modal__preview-card-criteria">
                              Genre:
                            </span>{" "}
                            {book.genre}
                          </p>
                          <p className="edit-modal__preview-card-text">
                            <span className="edit-modal__preview-card-criteria">
                              Description:
                            </span>{" "}
                            {book.description}
                          </p>
                          <p className="edit-modal__preview-card-text">
                            <span className="edit-modal__preview-card-criteria">
                              Pages:
                            </span>{" "}
                            {`${book.total_pages} / ${book.read_pages} ${
                              +book.total_pages === +book.read_pages &&
                              +book.total_pages !== 0
                                ? "(Finished)"
                                : ""
                            } `}
                          </p>
                        </div>
                        <div className="edit-modal__preview-card-progress">
                          <CircularProgressbar
                            circleRatio={0.6}
                            className="edit-modal__progress-bar"
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
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-modal__overlay"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
