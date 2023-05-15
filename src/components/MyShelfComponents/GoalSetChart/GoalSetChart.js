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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?pending=0`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setBooksFinished(data.length)
      });
  }, [token]);
  return (
    <motion.section
      className="goalset"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <div className="goalset__left">
        <h2 className="goalset__heading">Goal</h2>
      </div>

      <div className="goalset__container">
        <div className="goalset__semi-pie-container">
        <CircularProgressbar
          circleRatio={0.6}
          strokeWidth={12}
          styles={buildStyles({
            rotation: 1 / 5 + 1 / 2 ,
            strokeLinecap: "round",
            trailColor: "#F1F2F9",
            pathColor: '#6936F5',

          })}
          className="goalset__semi-pie"
          value={(booksFinished / goalset)*100}
        />
        <h3 className="goalset__center-text">Book read</h3>
        <h4 className="goalset__sub-center-text"> {booksFinished} : {goalset} </h4>
        </div>
      </div>
    </motion.section>
  );
}
