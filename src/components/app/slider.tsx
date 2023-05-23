import React from "react";

import Slider from "react-slick";
import { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftArrow from ".././../resources/left-arrow.svg";
import RightArrow from ".././../resources/right-arrow.svg";

function SampleNextArrow(props: CustomArrowProps) {
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: "block" }}
      onClick={props.onClick}
    >
      <img src={RightArrow} style={{ maxWidth: 70 }} />
    </div>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: "block" }}
      onClick={props.onClick}
    >
      <img src={LeftArrow} style={{ maxWidth: 70 }} />
    </div>
  );
}

const Carousel = () => {
  const ref = React.useRef(1);
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [sliderLength, setSliderLength] = React.useState(1);
  const settings = {
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
            src="https://www.youtube.com/embed/A4d_RX1d1Hg"
            title="YouTube video player"
            allow="accelerometer;gyroscope;"
            allowFullScreen
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
