import "./Banner.scss";

//libs
import { motion } from "framer-motion";
import { fadeInVariant } from "../../pageVariants/variants";

// icons
import BannerCircleVector from "../../assets/icons/BannerCircleBackground.svg";

export default function Banner() {
  return (
    <motion.section
      className="banner"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="banner__container">
        <h1 className="banner__text">
          Join our book lovers community here now
        </h1>
        <button className="banner__CTA">Join now</button>
        <img
          src={BannerCircleVector}
          className="banner__circle banner__circle--top"
          alt="banner background for circle vector"
        />
        <img
          src={BannerCircleVector}
          className="banner__circle banner__circle--bottom"
          alt="banner background for circle vector"
        />
      </div>
    </motion.section>
  );
}
