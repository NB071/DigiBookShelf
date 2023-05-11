import "./FinishedBooksCounter.scss";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

export default function FinishedBooksCounter() {
  const [finishedBooks, setfinishedBooks] = useState();
  const token = localStorage.getItem("token");
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
    <section className="finished-books">
      <h2 className="finished-books__heading">Books finished</h2>

      {finishedBooks ? (
        <span className="finished-books__number">
          <CountUp delay={0.5} duration={4} end={finishedBooks.length} />
        </span>
      ) : (
        <Skeleton width={50} height={50} />
      )}
    </section>
  );
}
