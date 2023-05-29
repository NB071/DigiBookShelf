import "./NotFound.scss";

//libs
import { motion } from "framer-motion";
import { loaderVariant } from "../../pageVariants/variants";

import Logo from "../../assets/logo/Logo.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.main
      className="not-found"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loaderVariant}
      transition={{ duration: 0.5 }}
    >
      <Link to={"/dashboard"}>
        <img src={Logo} alt="logo" />
      </Link>
      <h2 className="not-found__text">404: Page not found</h2>
      <p className="not-found__return-text">
        Return to - <Link to={"/dashboard"}>Dashboard</Link>
      </p>
    </motion.main>
  );
}
