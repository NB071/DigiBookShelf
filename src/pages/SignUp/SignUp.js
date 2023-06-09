// SCSS
import "./SignUp.scss";

// Packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { pageVariant } from "../../pageVariants/variants";
import axios from "axios";
import * as Yup from "yup";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

// images
import Logo from "../../assets/logo/Logo.svg";
import Lines from "../../assets/Images/Lines.svg";

export default function SignUp({ handleLogin, token }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  if (token) {
    navigate("/dashboard");
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
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
      password: Yup.string()
        .matches(/^.{8,}$/, "Password should be a mininum of 7 characters")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/register`,
          values
        );
        handleLogin(response.data.token);
        navigate("/dashboard");
      } catch (error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("Email") && errorMessage.includes("Username")) {
          formik.errors.email = "Email already exists";
          formik.errors.username = "Username already exists";
        } else if (errorMessage.includes("Email")) {
          formik.errors.email = "Email already exists";
          
        } else if (errorMessage.includes("Username")) {
          formik.errors.username = "Username already exists";
        }
      }
    },
  });

  return (
    <main className="sign-up">
      {/* Left side */}
      <motion.section
        className="sign-up__left"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 1 }}
      >
        <video
          className="sign-up__video-background"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={`${process.env.REACT_APP_API_URL}/videos/loginVideo${
              Math.floor(Math.random() * 10) + 1
            }`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="sign-up__overlay"></div>
        <img className="sign-up__logo-left" src={Logo} alt="Logo" />

        <div className="sign-up__text-wrapper-left">
          <motion.h1
            className="sign-up__heading-left"
            variants={{
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Create your world of your knowledge
          </motion.h1>
          <motion.p
            className="sign-up__text-left"
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Step into a Realm of Boundless Knowledge and Track Your Literary
            Adventures with our Feature-Rich Book Tracking Dashboard.
          </motion.p>
        </div>
        <img className="sign-up__curved-lines" src={Lines} alt="Curved Lines" />
      </motion.section>

      {/* Right side */}
      <motion.section
        className="sign-up__right"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        {/* Mobile right side Logo */}
        <img className="sign-up__logo-right" src={Logo} alt="Logo" />
        <div className="sign-up__text-wrapper-right">
          <h2 className="sign-up__heading-right">Join us!</h2>
          <p className="sign-up__text-right">
            Already have an account?{" "}
            <Link className="sign-up__link" to="/login">
              Log in
            </Link>
          </p>
        </div>
        {/* form */}
        <div className="sign-up__form">
          <form onSubmit={formik.handleSubmit}>
            <div className="sign-up__input-wrapper">
              <div className="sign-up__name-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  First Name:
                  <input
                    className={`sign-up__name-input ${
                      formik.touched.first_name && formik.errors.first_name
                        ? "sign-up__name-input--invalid"
                        : ""
                    }`}
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <motion.div
                      className="sign-up__error"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="sign-up__error-icon" />
                      <span className="sign-up__error-msg">
                        {formik.errors.first_name}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Last Name:
                  <input
                    className={`sign-up__name-input ${
                      formik.touched.last_name && formik.errors.last_name
                        ? "sign-up__name-input--invalid"
                        : ""
                    }`}
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <motion.div
                      className="sign-up__error"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="sign-up__error-icon" />
                      <span className="sign-up__error-msg">
                        {formik.errors.last_name}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
              </div>
              <div className="sign-up__username-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  Username:
                  <input
                    className={`sign-up__name-input ${
                      formik.touched.username && formik.errors.username
                        ? "sign-up__name-input--invalid"
                        : ""
                    }`}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <motion.div
                      className="sign-up__error"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="sign-up__error-icon" />
                      <span className="sign-up__error-msg">
                        {formik.errors.username}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
              </div>
              <div className="sign-up__email-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  Email:
                  <input
                    className={`sign-up__email-input ${
                      formik.touched.email && formik.errors.email
                        ? "sign-up__email-input--invalid"
                        : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <motion.div
                      className="sign-up__error"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="sign-up__error-icon" />
                      <span className="sign-up__error-msg">
                        {formik.errors.email}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
              </div>
              <div className="sign-up__password-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 1 }}
                >
                  Password:
                  <input
                    className={`sign-up__password-input ${
                      formik.touched.password && formik.errors.password
                        ? "sign-up__password-input--invalid"
                        : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <motion.div
                      className="sign-up__error"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="sign-up__error-icon" />
                      <span className="sign-up__error-msg">
                        {formik.errors.password}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
                <div
                  className={"sign-up__show-password-icon"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              <button type="submit" className="sign-up__submit-button">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
