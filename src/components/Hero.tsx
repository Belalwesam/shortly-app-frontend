import React from "react";
import Working from "../images/illustration-working.svg";
const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-section-inner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 order-2 order-md-1 mt-4 mt-md-0">
              <div className="hero-text">
                <h1 className="m-0">More than just shorter links</h1>
                <p className="m-0">
                  Build your brand’s recognition and get detailed insights on
                  how your links are performing.
                </p>
                <div className="hero-container-cta">
                  <button>Get Started</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 order-1 order-md-2">
              <div className="hero-img-wrapper">
                <img
                  src={Working}
                  alt="Hero Illustration"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
