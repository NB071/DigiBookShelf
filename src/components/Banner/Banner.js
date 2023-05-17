import "./Banner.scss";

//libs
import { motion } from "framer-motion";
import { fadeInVariant } from "../../pageVariants/variants";

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
        <div className="banner__circle banner__circle--top">
          <svg
            width="162"
            height="162"
            viewBox="0 0 162 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="80.5919"
              cy="80.592"
              r="80.5"
              transform="rotate(75 80.5919 80.592)"
              fill="#8156F7"
            />
          </svg>
        </div>
        <div className="banner__circle banner__circle--bottom">
          <svg
            width="162"
            height="162"
            viewBox="0 0 162 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="80.5919"
              cy="80.592"
              r="80.5"
              transform="rotate(75 80.5919 80.592)"
              fill="#8156F7"
            />
          </svg>
        </div>
        
      </div>
    </motion.section>
  );
}
