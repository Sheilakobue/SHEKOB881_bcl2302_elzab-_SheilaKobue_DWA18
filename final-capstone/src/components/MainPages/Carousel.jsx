
// Import necessary modules and components
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function Carousel() {
  // State variables
  const [shows, setShows] = useState([]);
  const [carouselPosition, setCarouselPosition] = useState(0);

  // Carousel Variables
  const slideWidth = 200;
  const slidesToShow = 5;
  const containerWidth = slideWidth * shows.length;

  /**
   * Fetch data from the API when the component mounts
   * Update the state with the fetched data
   */
  useEffect(() => {
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to move the carousel by a given number of steps
  const moveCarousel = (steps) => {
    const newPosition = carouselPosition + steps * slideWidth * slidesToShow;
    setCarouselPosition(
      Math.max(
        -(containerWidth - slideWidth * slidesToShow),
        Math.min(0, newPosition)
      )
    );
  };

  let interval;
  const handleBackwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(1), 200); // Adjust the interval duration to control the speed (200ms in this example)
  };

  // Function to handle mouse down on the backward arrow icon
  const handleForwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(-1), 200); // Adjust the interval duration to control the speed (200ms in this example)
  };

  // Function to handle mouse up (stop carousel movement)
  const handleMouseUp = () => {
    clearInterval(interval);
  };
  return (
    <div className="hero-section">
      <div className="carousel-container">
        <div
          className="show-info"
          style={{
            transform: `translateX(${carouselPosition}px)`,
            width: `${containerWidth}px`,
          }}
        >
          {shows.map((show) => (
            <div key={show.id}>
              <img src={show.image} alt={show.name} width={slideWidth} />
              <h1>{show.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <ArrowBackIosNewOutlinedIcon
        className="arrow-icon backward"
        onMouseDown={handleBackwardMouseDown}
        onMouseUp={handleMouseUp}
      />
      <ArrowForwardIosOutlinedIcon
        className="arrow-icon forward"
        onMouseDown={handleForwardMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
