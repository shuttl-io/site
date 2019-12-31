import React from "react";
import { Link } from "gatsby";
import useFluidBackground from "../utils/useFluidBackground";

export default (props) => {
  const img = useFluidBackground(props.fluid);
  return (
    <section className="p-0">
      <div className="swiper-container text-white swiper-container-fade swiper-container-horizontal skrollable skrollable-between" data-top-top="transform: translateY(0px);" data-top-bottom="transform: translateY(250px);" style={{ transform: "translateY(0px)" }}>
        <div className="swiper-wrapper">
          <div className="swiper-slide vh-100 swiper-slide-active" style={{
            width: "1904px", opacity: 1, transform: "translate3d(0px, 0px, 0px)",
          }}>
            <div className="image image-overlay image-zoom" style={{ backgroundImage: `url(${img})` }}></div>
            <div className="caption">
              <div className="container">
                <div className="row align-items-center vh-100">
                  <div className="col-md-8" data-swiper-parallax-y="-250%" style={{ transform: "translate3d(0px, 0%, 0px)" }}>
                    {!!!props.hideLink && <Link to={`/blog/${props.category.slug}`} className="eyebrow mb-2">{props.category.name}</Link>}
                    <h1 className="display-2">{props.title}</h1>
                    <span dangerouslySetInnerHTML={{ __html: props.byline }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-footer mb-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col text-center">
                  <div className="mouse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
    </section>
  )
}