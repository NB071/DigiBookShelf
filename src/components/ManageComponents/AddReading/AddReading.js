import "./AddReading.scss";

// libs
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { pageVariant, slideVariant } from "../../../pageVariants/variants";
import axios from "axios";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";


// svgs
import BookImagePlaceHolder from "../../../assets/icons/addedBookPlaceholder.svg";

//icons
import ErrorIcon from "@mui/icons-material/Error";

export default function AddReading({ token }) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  function handleThumbnailUpload(e) {
    const uploadedThumbnail = e.target.files[0];
    if (uploadedThumbnail) {
      formik.setFieldValue("cover_image", e.target.files[0]);
      const render = new FileReader();
      render.readAsDataURL(uploadedThumbnail);
      render.onload = () => {
        formik.setFieldValue("cover_image_preview", render.result);
      };
    }
  }
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
      try {
        const formData = new FormData();
        formData.append("book_name", values.book_name);
        formData.append("book_description", values.book_description);
        formData.append("book_genre", values.book_genre);
        formData.append("book_author", values.book_author);
        formData.append("total_pages", values.total_pages);
        formData.append("read_pages", values.read_pages);
        formData.append("cover_image", values.cover_image);

        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/books`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        enqueueSnackbar("Success", {
          variant: "success",
          style: {
            backgroundColor: "#578C7A",
            height: "4rem",
            borderRadius: "18px",
          },
        });
        
        queryClient.refetchQueries("userBooks");
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Failure", {
          variant: "error",
          style: {
            backgroundColor: "#eb4343",
            height: "4rem",
            borderRadius: "18px",
          },
        });
      }
    },
  });
  return (
    <motion.section
      className="add-reading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <motion.h2
        className="add-reading__heading"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        Add a reading
      </motion.h2>
      <motion.article
        className="add-reading__card-info"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <div className="add-reading__left">
          <img
            className="add-reading__cover-image"
            src={`${formik.values.cover_image_preview || BookImagePlaceHolder}`}
            alt="book cover preview"
          />
        </div>
        <div className="add-reading__right">
          <motion.div
            className="add-reading__book-name"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <h3 className="add-reading__criteria-heading">Book's name</h3>
            <p className="add-reading__book-name-value">
              {formik.values.book_name || "---"}
            </p>
          </motion.div>
          <motion.div
            className="add-reading__book-description"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <h3 className="add-reading__criteria-heading">
              Book's description
            </h3>
            <p className="add-reading__book-description-value">
              {formik.values.book_description || "---"}
            </p>
          </motion.div>
          <motion.div
            className="add-reading__book-genre"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <h3 className="add-reading__criteria-heading">Book's genre</h3>
            <p className="add-reading__book-genre-value">
              {formik.values.book_genre || "---"}
            </p>
          </motion.div>
          <motion.div
            className="add-reading__book-pages"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <h3 className="add-reading__criteria-heading">Progress</h3>
            <p className="add-reading__book-genre-value">
              <span>{formik.values.total_pages || "-"}</span> /{" "}
              <span>{formik.values.read_pages || "0"}</span>
            </p>
          </motion.div>
          <motion.div
            className="add-reading-book-author"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariant}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <h3 className="add-reading__criteria-heading">Book's author</h3>
            <p className="add-reading__book-author-value">
              {formik.values.book_author || "---"}
            </p>
          </motion.div>
        </div>
      </motion.article>
      <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
        <div className="add-reading__input-wrapper">
          <div className="add-reading__left-inputs">
            {/* book name input */}
            <motion.div
              className="add-reading__book-name-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <label>
                Book name
                <input
                  className={`add-reading__input  ${
                    formik.touched.book_name && formik.errors.book_name
                      ? "add-reading__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="book_name"
                  placeholder="Book name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.book_name && formik.errors.book_name ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.book_name}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            {/* book desc input */}
            <motion.div
              className="add-reading__book-description-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <label>
                Book description
                <textarea
                  className={`add-reading__input add-reading__input--description ${
                    formik.touched.book_description &&
                    formik.errors.book_description
                      ? "add-reading__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="book_description"
                  placeholder="Book description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.book_description &&
                formik.errors.book_description ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.book_description}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            {/* book genre input */}
            <motion.div
              className="add-reading__book-genre-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <label>
                Book genre
                <input
                  className={`add-reading__input  ${
                    formik.touched.book_genre && formik.errors.book_genre
                      ? "add-reading__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="book_genre"
                  placeholder="Book genre"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.book_genre && formik.errors.book_genre ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.book_genre}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
            {/* book pages input */}
            
          </div>
          <div className="add-reading__right-inputs">
            {/* author name input */}
            <motion.div
              className="add-reading__book-number-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <label>
                Total page no.
                <input
                  className={`add-reading__input  ${
                    formik.touched.total_pages && formik.errors.total_pages
                      ? "add-reading__input--invalid"
                      : ""
                  }`}
                  type="number"
                  name="total_pages"
                  placeholder="Page number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.total_pages && formik.errors.total_pages ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.total_pages}
                    </span>
                  </motion.div>
                ) : null}
              </label>

              <span className="add-reading__paegs-spliter"> / </span>
              <label>
                Read page no.
                <input
                  className={`add-reading__input  ${
                    formik.touched.read_pages && formik.errors.read_pages
                      ? "add-reading__input--invalid"
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
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.read_pages}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            <motion.div
              className="add-reading__book-author-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <label>
                Author name
                <input
                  className={`add-reading__input  ${
                    formik.touched.book_author && formik.errors.book_author
                      ? "add-reading__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="book_author"
                  placeholder="author name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.book_author && formik.errors.book_author ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.book_author}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            {/* book cover file input */}
            <motion.div
              className="add-reading__book-cover-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <label>
                Book cover:
                <input
                  className="add-reading__input-file"
                  type="file"
                  name="cover_image_preview"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cover_image_preview &&
                formik.errors.cover_image_preview ? (
                  <motion.div
                    className="add-reading__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="add-reading__error-icon" />
                    <span className="add-reading__error-msg">
                      {formik.errors.cover_image_preview}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="add-reading__CTAs"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1.3 }}
            >
              <button className="add-reading__CTA-button" type="submit">
                + Add
              </button>
              <button
                className="add-reading__CTA-button add-reading__CTA-button--cancel"
                type="reset"
              >
                Reset
              </button>
            </motion.div>
          </div>
        </div>
      </form>
    </motion.section>
  );
}
