import "./TotalBooksCounter.scss";

// libs
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";
import CountUp from "react-countup";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

export default function TotalBooks() {
  const [totalShelfBooks, setTotalShelfBooks] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setTotalShelfBooks(data);
      });
  }, [token]);
  return (
    <motion.section
      className="Total-books"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 0.9 }}
    >
      <h2 className="Total-books__heading">Books in shelf</h2>

      {totalShelfBooks ? (
        <span className="Total-books__number">
          <CountUp delay={0.5} duration={4} end={totalShelfBooks.length} />
        </span>
      ) : (
        <Skeleton width={50} height={50} />
      )}
    </motion.section>
  );
}
