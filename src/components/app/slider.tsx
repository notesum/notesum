import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import LeftArrow from ".././../resources/left-arrow.svg";
import RightArrow from ".././../resources/right-arrow.svg";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img src={RightArrow} style={{ maxWidth: 70 }} width="70px" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <img src={LeftArrow} style={{ maxWidth: 70 }} width="70px" />
    </div>
  );
}

//   main slider component
const Carousel = () => {
  const ref = React.useRef(1);
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [sliderLength, setSliderLength] = React.useState(1);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
  };
  React.useEffect(() => {
    setSliderLength(ref.current?.innerSlider?.props.children.length);
  }, []);
  return (
    <div className="slider-section">
      <Slider {...settings} ref={ref}>
        <div className="slider-item">
          <iframe src="https://www.youtube-nocookie.com/embed/Ny7KUFpzqm0"
            loading="lazy"
            srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/Ny7KUFpzqm0><img src=https://img.youtube.com/vi/Ny7KUFpzqm0/sddefault.jpg alt='CosmoNote'><span>▶</span></a>"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="slider-item">
          <iframe src="https://www.youtube-nocookie.com/embed/Ny7KUFpzqm0"
            loading="lazy"
            srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube-nocookie.com/embed/Ny7KUFpzqm0><img src=https://img.youtube.com/vi/Ny7KUFpzqm0/sddefault.jpg alt='CosmoNote'><span>▶</span></a>"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </Slider>

      <div className="slider-count">
        {currentSlide} / {sliderLength}
      </div>
    </div>
  );
};

export default Carousel;
