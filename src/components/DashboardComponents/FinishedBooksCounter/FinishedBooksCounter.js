import "./FinishedBooksCounter.scss";

// libs
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";
import Wave from "react-wavify";

export default function FinishedBooksCounter({ userBooks }) {
  const finishedBooks = userBooks.filter((book) => book.is_pending === 0)
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

      {userBooks ? (
        <span className="finished-books__number">
          <CountUp
            delay={0.5}
            duration={4}
            end={finishedBooks}
          />
        </span>
      ) : 0}
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
