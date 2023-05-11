import "./RecentReading.scss";
// libs
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

export default function RecentReading() {
  const [recentBooks, setRecentBooks] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setRecentBooks(data);
      });
  }, [token]);
  return (
    <section className="recent-reading">
      {recentBooks &&
        recentBooks.length !==
          0 ?(
            <>
              <div className="recent-reading__left">
                <div className="recent-reading__top-left-wrapper">
                  <h3 className="recent-reading__sub-heading">
                    Continue Reading
                  </h3>
                  <h2 className="recent-reading__book-name">
                    {recentBooks ? (
                      recentBooks.book_name
                    ) : (
                      <Skeleton width={200} height={24} />
                    )}
                  </h2>
                </div>
                <p className="recent-reading__book-description">
                  {recentBooks ? (
                    recentBooks.description
                  ) : (
                    <Skeleton count={3} width={300} height={12} />
                  )}
                </p>
                <div className="recent-reading__bottom">
                  {recentBooks ? (
                    <>
                      <button type="button" className="recent-reading__CTA">
                        Read Now
                      </button>
                      <div className="recent-reading__dot-wrapper">
                        <span className="recent-reading__dot"></span>
                        <span className="recent-reading__page-info">
                          Page {recentBooks.read_pages} of{" "}
                          {recentBooks.total_pages}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Skeleton width={120} height={36} borderRadius={18} />
                      <Skeleton width={8} height={8} />
                      <Skeleton width={100} height={18} borderRadius={18} />
                    </>
                  )}
                </div>
              </div>
              <div className="recent-reading__right">
                {recentBooks ? (
                  <img
                    src={recentBooks.cover_image}
                    className="recent-reading__book-cover"
                    alt="recent reading book cover"
                  />
                ) : null}
              </div>
            </>
          ): <h2>There's no book in your shelf...</h2>}
    </section>
  );
}
