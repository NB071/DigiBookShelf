import "./TotalBooksCounter.scss";

// libs
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";
import CountUp from "react-countup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TotalBooks({token}) {
  const [totalShelfBooks, setTotalShelfBooks] = useState();

  const navigate = useNavigate()
  
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
      onClick={()=> navigate("/my-shelf")}
    >
      <h2 className="Total-books__heading">Books in shelf</h2>

      {totalShelfBooks ? (
        <span className="Total-books__number">
          <CountUp delay={0.3} duration={4} end={totalShelfBooks.length} />
        </span>
      ) : (
        <span className="Total-books__number">0</span>
      )}
    </motion.section>
  );
}
