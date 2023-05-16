import "./FinishedBooksCounter.scss";

// libs
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";
import axios from "axios";
import Wave from "react-wavify";

export default function FinishedBooksCounter({ token }) {
  const [finishedBooks, setfinishedBooks] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=0`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setfinishedBooks(data);
      });
  }, [token]);
  return (
    <motion.section
      className="finished-books"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 1 }}
    >
      <h2 className="finished-books__heading">Books finished</h2>

      {finishedBooks ? (
        <span className="finished-books__number">
          <CountUp delay={0.5} duration={4} end={finishedBooks.length} />
        </span>
      ) : null}
       <Wave
          fill="#6936F5"
          paused={false}
          options={{
            amplitude: 20,
            speed: 0.4,
            points: 3,
          }}
          className="finished-books__background-wave"
        />
    </motion.section>
  );
}
