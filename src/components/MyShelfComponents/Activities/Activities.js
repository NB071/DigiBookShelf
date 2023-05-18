import "./Activities.scss";

//libs
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageVariantTop } from "../../../pageVariants/variants";
import axios from "axios";
import ReactApexChart from "react-apexcharts";


export default function Activities({ token }) {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/activities`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setActivities(data);
      });
  }, [token]);

  if (!activities) {
    return null;
  }
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const counts = Array(7).fill(0);

  activities.forEach((item) => {
    const updatedAtDate = new Date(item.updated_at);
    const updatedAtDayOfWeek = updatedAtDate.getDay();
    counts[updatedAtDayOfWeek]++;
  });

  const series = [
    {
      name: "Activity",
      data: counts,
    },
  ];

  const options = {
    chart: {
      type: "area",
      stacked: false,
      fontFamily: "poppins, Arial, sans-serif",
      margin: 50,
    },
    xaxis: {
      categories: labels,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: ["#6936F5"],
    title: {
      text: "Your activities",
      align: "left",

    },
    noData: {
      text: "No activity",
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
    dataLabels: {
      enabled: false
    },
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
  };

  return (
    <motion.section
      className="user-activity"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariantTop}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <div className="user-activity__chart-container">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={"100%"}
        />
      </div>
    </motion.section>
  );
}
