import "./GoalSetChart.scss";

//libs
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";

export default function BooksToRead() {

  return (
    <motion.section
      className="goalset"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 1 }}
    >
      <div className="goalset__left">
        <h2 className="goalset__heading">Books to Read</h2>
      </div>

      <div className="goalset__right-container">
       
      </div>
    </motion.section>
  );
}
