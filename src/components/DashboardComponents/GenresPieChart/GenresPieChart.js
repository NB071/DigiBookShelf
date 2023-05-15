import "./GenresPieChart.scss";

//libs
import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import ApexCharts from "apexcharts";
import { motion } from "framer-motion";
import { fadeInVariant } from "../../../pageVariants/variants";

export default function GenresPieChart({token}) {
  const [genresCount, setGenresCount] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books/genres`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setGenresCount(data);
      })
      .catch((error) => {
        console.error("Error fetching genres count:", error);
      });
  }, [token]);

  useEffect(() => {
    if (genresCount && chartRef.current) {
      const options = {
        chart: {
          type: "donut",
          width: 400,
          height: 400,
          fontFamily: "poppins, Arial, sans-serif",
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1350,

            animateGradually: {
              enabled: true,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1350,
            },
          },
        },
        series: Object.values(genresCount),
        labels: Object.keys(genresCount),
        dataLabels: {
          enabled: false,
        },

        noData: {
          text: "There is no book in your shelf.",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "#1D1D1D",
            fontSize: "0.875rem",
            fontFamily: "poppins",
          },
        },
        stroke: {
          show: false,
        },
        colors: ["#6936F5", "#333333", "#F2831B", "#B2B7C5", "#578C7A"],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                },
                value: {
                  show: true,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: "Favorite genre",
                  formatter: function (w) {
                    const maxPercentage = Math.max(...w.globals.series);
                    const index = w.globals.series.indexOf(maxPercentage);
                    return w.globals.labels[index];
                  },
                },
              },
            },
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      return () => {
        chart.destroy();
      };
    }
  }, [genresCount]);

  if (!genresCount) {
    return (
      <section>
        <Skeleton width={200} height={200} />
      </section>
    );
  }

  return (
    <motion.section
      className="genres-piechart"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <div ref={chartRef}></div>
    </motion.section>
  );
}
