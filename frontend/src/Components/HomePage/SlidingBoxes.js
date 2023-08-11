import { useState } from "react";
import image1 from "./Images/1.jpg";
import image2 from "./Images/2.jpg";
import image3 from "./Images/3.jpg";
import image4 from "./Images/4.jpg";
import image5 from "./Images/5.jpg";
import "./CSS/SlidingBoxes.css";

const cards = [
  {
    header: "",
    image: image2,
    text: `Explore the beauty of Canada!`,
  },
  {
    header: "Bali",
    image: image1,
    text: `Relax and unwind in Bali's paradise.`,
  },
  {
    header: "Spain",
    image: image3,
    text: `Experience the vibrant culture of Spain.`,
  },
  {
    header: "Indonesia",
    image: image4,
    text: `Discover the diverse landscapes of Indonesia.`,
  },
  {
    header: "South Africa",
    image: image5,
    text: `Embark on a safari in South Africa.`,
  },
];

const SlidingBoxes = () => {
  const [active, setActive] = useState(0);

  const handleToggle = (index) => setActive(index);

  return (
    <section className="container">
      <div className="text-area">
        {/* Display text related to the active card */}
        <h2>{cards[active].header}</h2>
        <p>{cards[active].text}</p>
      </div>
      <div className="slider">
        {cards.map((card, index) => {
          const isActive = active === index ? "active" : "";
          return (
            <article
              key={card.image}
              className={isActive}
              onClick={() => handleToggle(index)}
            >
              <img src={card.image} alt="" />
              <div className="content">
                <span className="material-symbols-outlined">photo_camera</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SlidingBoxes;
