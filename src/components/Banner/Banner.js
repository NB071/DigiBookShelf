import "./Banner.scss"

// icons
import BannerCircleVector from "../../assets/icons/BannerCircleBackground.svg";

export default function Banner() {

    return (
        <section className="banner">
              <div className="banner__container">
                <h1 className="banner__text">
                  Join our book lovers community here now
                </h1>
                <button className="banner__CTA">Join now</button>
                <img
                  src={BannerCircleVector}
                  className="banner__circle banner__circle--top"
                  alt="banner background for circle vector"
                />
                <img
                  src={BannerCircleVector}
                  className="banner__circle banner__circle--bottom"
                  alt="banner background for circle vector"
                />
              </div>
            </section>
    )
}