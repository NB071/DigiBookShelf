// SCSS
import "./Login.scss";

// Packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import axios from "axios";
import * as Yup from "yup";
import { pageVariant, slideVariant } from "../../pageVariants/variants";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Error";

// images
import Logo from "../../assets/logo/Logo.svg";
import Lines from "../../assets/Images/Lines.svg";

export default function Login({ token, handleLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  if (token) {
    navigate("/dashboard");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("This field is required"),
      password: Yup.string()
        .matches(/^.{8,}$/, "Password should be a mininum of 7 characters")
        .required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/login`,
          values
        );
        handleLogin(response.data.token);
        navigate("/dashboard");
      } catch (error) {
        formik.errors.email = "Incorrect email or password";
        formik.errors.password = "Incorrect email or password";
      }
    },
  });

  return (
    <main className="login">
      {/* Left side */}
      <motion.section
        className="login__left"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 1 }}
      >
        <video
          className="login__video-background"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={`${process.env.REACT_APP_API_URL}/videos/LoginVideo${
              Math.floor(Math.random() * 10) + 1
            }`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="login__overlay"></div>
        <img className="login__logo-left" src={Logo} alt="Logo" />

        <div className="login__text-wrapper-left">
          <motion.h1
            className="login__heading-left"
            variants={{
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Enter to the world of your knowledge
          </motion.h1>
          <motion.p
            className="login__text-left"
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
        <img className="login__curved-lines" src={Lines} alt="Curved Lines" />
      </motion.section>
      {/* Right side */}
      <motion.section
        className="login__right"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariant}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        {/* Mobile right side Logo */}
        <img className="login__logo-right" src={Logo} alt="Logo" />
        <div className="login__text-wrapper-right">
          <h2 className="login__heading-right">Welcome Back!</h2>
          <p className="login__text-right">
            Don't have an account?{" "}
            <Link className="login__link" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
        {/* form */}
        <div className="login__form">
          <form onSubmit={formik.handleSubmit}>
            <div className="login__input-wrapper">
              <div className="login__email-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  Email:
                  <input
                    className={`login__email-input ${
                      formik.touched.email && formik.errors.email
                        ? "login__email-input--invalid"
                        : ""
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <motion.div
                      className="login__error"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={slideVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="login__error-icon" />
                      <span className="login__error-msg">
                        {formik.errors.email}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>
              </div>
              <div className="login__password-input-wrapper">
                <motion.label
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariant}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  Password:
                  <input
                    className={`login__password-input ${
                      formik.touched.password && formik.errors.password
                        ? "login__password-input--invalid"
                        : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <motion.div
                      className="login__error"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={slideVariant}
                      transition={{ duration: 0.7 }}
                    >
                      <ErrorIcon className="login__error-icon" />
                      <span className="login__error-msg">
                        {formik.errors.password}
                      </span>
                    </motion.div>
                  ) : null}
                </motion.label>

                <div
                  className={"login__show-password-icon"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
              <Link className="login__forgot-password-label login__link">
                Forgot Password
              </Link>
              <button type="submit" className="login__submit-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
