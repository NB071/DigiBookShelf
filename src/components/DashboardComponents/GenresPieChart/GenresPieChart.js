import React, { useEffect, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import ApexCharts from "apexcharts";
import "./GenresPieChart.scss";

export default function GenresPieChart() {
  const [genresCount, setGenresCount] = useState(null);
  const chartRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books/genres`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setGenresCount(data);
      })
      .catch((error) => {
        console.log("Error fetching genres count:", error);
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

      // Cleanup the chart when component is unmounted
      return () => {
        chart.destroy();
      };
    }
  }, [genresCount]);

  if (!genresCount) {
    return (
      <section className="genres-piechart">
        <Skeleton width={200} height={200} />
      </section>
    );
  }

  return (
    <section className="genres-piechart">
      <div ref={chartRef}></div>
    </section>
  );
}
