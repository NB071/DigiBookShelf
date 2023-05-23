import "./UserPrivacy.scss";

// libs
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
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

export default function UserPrivacy({ userInfo, token, handleLogout }) {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(/^.{8,}$/, "Password should be a minimum of 7 characters")
        .required("This field is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/user/password`,
          { password: values.password },
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
        setTimeout(() => {
          handleLogout();
        }, 1000);
        
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
        <img
          src={userInfo.avatar_image}
          className="user__avatar"
          alt="user avatar"
        />

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
              location.pathname === "/user/friends"
                ? "user__link-item--selected"
                : ""
            }`}
          >
            <PeopleAltIcon /> Friends
          </Link>
        </div>
        <div className="privacy">
          <div className="privacy__container">
            <motion.div
              className="privacy__password-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <label>
                Password
                <input
                  className={`privacy__input  ${
                    formik.touched.password && formik.errors.password
                      ? "privacy__input--invalid"
                      : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <motion.div
                    className="privacy__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="privacy__error-icon" />
                    <span className="privacy__error-msg">
                      {formik.errors.password}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
            <motion.div
              className="privacy__confirm-password-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariant}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <label>
                Confirm password
                <input
                  className={`privacy__input  ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "privacy__input--invalid"
                      : ""
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <motion.div
                    className="privacy__error"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={slideVariant}
                    transition={{ duration: 0.7 }}
                  >
                    <ErrorIcon className="privacy__error-icon" />
                    <span className="privacy__error-msg">
                      {formik.errors.confirmPassword}
                    </span>
                  </motion.div>
                ) : null}
              </label>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="privacy__CTAs"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariant}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <button className="privacy__CTA-button" type="submit">
            Change
          </button>
          <button
            className="privacy__CTA-button privacy__CTA-button--cancel"
            type="reset"
          >
            Reset
          </button>
        </motion.div>
      </form>
    </motion.section>
  );
}
