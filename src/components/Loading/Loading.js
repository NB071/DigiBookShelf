import "./Loading.scss";

import Loader from "react-spinners/HashLoader";
import { motion } from "framer-motion";
import { loaderVariant } from "../../pageVariants/variants";

// logo
import Logo from "../../assets/logo/bookLogo.svg";

export default function Loading() {
  return (
    <motion.div
      className="loading"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loaderVariant}
      transition={{ duration: 0.3 }}
    >
      <img src={Logo} alt="logo" className="loading__logo" />
      <Loader
        color="#fff"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </motion.div>
  );
}
