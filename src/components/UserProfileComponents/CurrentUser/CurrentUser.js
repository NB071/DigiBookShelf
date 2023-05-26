import "./CurrentUser.scss";

// libs
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { motion } from "framer-motion";
import {
  fadeInVariant,
  pageVariant,
  slideVariant,
} from "../../../pageVariants/variants";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ErrorIcon from "@mui/icons-material/Error";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function CurrentUser({ userInfo, token }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  function handleAvatarChange(e) {
    const avatarImage = e.target.files[0];
    if (avatarImage) {
      formik.setFieldValue("avatar_image", e.target.files[0]);
      const render = new FileReader();
      render.readAsDataURL(avatarImage);
      render.onload = () => {
        formik.setFieldValue("avatar_image_preview", render.result);
      };
    }
  }

  const formik = useFormik({
    initialValues: {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      username: userInfo.username,
      email: userInfo.email,
      avatar_image: userInfo.avatar_image,
      avatar_image_preview: userInfo.avatar_image,
      goal_set: userInfo.goal_set || 0,
      favorite_genre: userInfo.favorite_genre || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Invalid name format")
        .required("This field is required"),
      last_name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Invalid name format")
        .required("This field is required"),
      username: Yup.string()
        .matches(/^.{4,}$/, "Username should be a mininum of 4 characters")
        .required("This field is required"),
      email: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("goal_set", values.goal_set);
        if (values.avatar_image)
          formData.append("avatar_image", values.avatar_image);

        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user`,
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
        queryClient.refetchQueries("userInfo");
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
    },
  });

  return (
    <motion.section
      className="user"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7 }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="user__from"
        onReset={formik.resetForm}
      >
        <label htmlFor="user__avatar-input" className="user__avatar-input">
          <img
            src={
              formik.values.avatar_image_preview || formik.values.avatar_image
            }
            className="user__avatar"
            alt="user avatar"
          />
          <AttachFileIcon className="user__avatar-hover-icon" />
          <input
            type="file"
            accept="image/*"
            id="user__avatar-input"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </label>
        <div className="user__links">
          <Link
          to="/user/profile"
            className={`user__link-item ${
              location.pathname === "/user/profile"
                ? "user__link-item--selected"
                : ""
            }`}
          >
            <AccountCircleIcon /> Profile
          </Link>
          <Link
          to="/user/privacy"
            className={`user__link-item ${
              location.pathname === "/user/privacy"
                ? "user__link-item--selected"
                : ""
            }`}
          >
            <AdminPanelSettingsIcon /> Privacy
          </Link>
          <Link
          to="/user/friends"
            className={`user__link-item ${
              location.pathname === "/user/privacy"
                ? "user__link-item--selected"
                : ""
            }`}
          >
            <PeopleAltIcon /> Friends
          </Link>
        </div>
        <div className="profile">
          <div className="profile__left">
            <motion.div
              className="profile__first-name-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <label>
                First name
                <input
                  className={`profile__input  ${
                    formik.touched.first_name && formik.errors.first_name
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="first_name"
                  placeholder="First_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.first_name}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            <motion.div
              className="profile__last-name-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <label>
                Last name
                <input
                  className={`profile__input ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.last_name}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            <motion.div
              className="profile__username-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <label>
                Username
                <input
                  className={`profile__input  ${
                    formik.touched.username && formik.errors.username
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.username}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>

            <motion.div
              className="profile__email-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <label>
                Email
                <input
                  className={`profile__input  ${
                    formik.touched.email && formik.errors.email
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.email}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
          </div>
          <div className="profile__right">
            <motion.div
              className="profile__goalset-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <label>
                Annual Goal
                <input
                  className={`profile__input  ${
                    formik.touched.goal_set && formik.errors.goal_set
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="number"
                  name="goal_set"
                  placeholder="Annual goal"
                  value={formik.values.goal_set}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.goal_set && formik.errors.goal_set ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.goal_set}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
            <motion.div
              className="profile__favorite-genre-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <label>
                Favorite Genre
                <input
                  className={`profile__input  ${
                    formik.touched.favorite_genre &&
                    formik.errors.favorite_genre
                      ? "profile__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="goal_set"
                  placeholder="Annual goal"
                  value={formik.values.favorite_genre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.favorite_genre &&
                formik.errors.favorite_genre ? (
                  <motion.div
                    className="profile__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="profile__error-icon" />
                    <span className="profile__error-msg">
                      {formik.errors.favorite_genre}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="profile__CTAs"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariant}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <button className="profile__CTA-button" type="submit">
            Change
          </button>
          <button
            className="profile__CTA-button profile__CTA-button--cancel"
            type="reset"
          >
            Revert
          </button>
        </motion.div>
      </form>
    </motion.section>
  );
}
