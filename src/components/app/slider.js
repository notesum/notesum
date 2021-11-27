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
      <img src={RightArrow} style={{ maxWidth: 70 }} />
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
      <img src={LeftArrow} style={{ maxWidth: 70 }} />
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
    setSliderLength(ref.current.innerSlider.props.children.length);
  }, []);
  return (
    <div className="slider-section">
      <Slider {...settings} ref={ref}>
        <div className="slider-item">
          <iframe
            src="https://www.youtube.com/embed/gmFdxuhtJE0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer;gyroscope;"
            allowfullscreen
          ></iframe>
        </div>
        <div className="slider-item">
          <iframe
            src="https://www.youtube.com/embed/gmFdxuhtJE0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer;gyroscope;"
            allowfullscreen
          ></iframe>
        </div>
      </Slider>

      <div className="slider-count">
        {currentSlide} / {sliderLength}
      </div>
    </div>
  );
};

export default Carousel;
