import "./TotalBooksCounter.scss";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
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
    <section className="Total-books">
      <h2 className="Total-books__heading">Books in shelf</h2>

      {totalShelfBooks ? (
        <span className="Total-books__number">
          <CountUp delay={0.5} duration={4} end={totalShelfBooks.length} />
        </span>
      ) : (
        <Skeleton width={50} height={50} />
      )}
    </section>
  );
}
