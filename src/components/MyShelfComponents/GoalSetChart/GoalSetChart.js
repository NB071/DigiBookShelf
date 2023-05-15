import "./GoalSetChart.scss";
import "react-circular-progressbar/dist/styles.css";

//libs
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";

export default function GoalSetChart({ token, goalset }) {
  const [booksFinished, setBooksFinished] = useState(null);

  console.log(goalset);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=0`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        console.log(data);
      });
  }, [token]);
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
        <h2 className="goalset__heading">Goal</h2>
      </div>

      <div className="goalset__container">
        <CircularProgressbar
          circleRatio={0.5}
          strokeWidth={12}
          styles={buildStyles({
            rotation: 1 / 4 + 1 / 2,
            strokeLinecap: "round",
            trailColor: "#f3f3f3e0",
          })}
          className="goalset__semi-pie"
          value={goalset}
          // text="Books read"
        />
      </div>
    </motion.section>
  );
}
