import { useState, useEffect } from "react";
import axios from "axios";

import {
  image1,
  image2,
  image4,
  image6,
  image7,
  image8,
  image9,
  image11,
  image12,
} from "./assets/index";

function App() {
  const [data, setData] = useState({});
  const [image, setImage] = useState({});
  const [location, setLocation] = useState("");
  const [randomImage, setRandomImage] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4925ec90737e1877d642d09d106ebd29`;
  const urlImage = `https://api.teleport.org/api/urban_areas/slug:${location}/images/`;

  const backgroundImage = [
    image1,
    image2,
    image4,
    image6,
    image7,
    image8,
    image9,
    image11,
    image12,
  ];
  let randomElement;
  function searchLocation(e) {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  }

  function searchImage(e) {
    axios.get(urlImage).then((response) => {
      setImage(response.data.photos[0].image.mobile);
    });
  }
  function search(e) {
    if (e.key === "Enter") {
      searchLocation();
      searchImage();
    }
  }

  useEffect(() => {
    let randomElement =
      backgroundImage[Math.floor(Math.random() * backgroundImage.length)];
    setRandomImage(randomElement);
    document.querySelectorAll("iframe").forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  }, []);

  return (
    <div
      className="app"
      style={{
        background: `url(${randomImage})  no-repeat center center/cover`,
      }}
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={search}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.sys ? (
              <h3>
                {data.name}, {data.sys.country}
              </h3>
            ) : null}
          </div>
          <div className="temp">
            {data.weather ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div
          className="middle"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        {data.name != undefined && (
          <div className="bottom">
            <div>
              <p className="des">
                {data.weather ? <p>{data.main.feels_like.toFixed()}</p> : null}
              </p>
              <p>Feels like</p>
            </div>
            <div>
              <p className="des">
                {data.weather ? <p>{data.main.humidity}</p> : null}
              </p>
              <p>Humidity</p>
            </div>
            <div>
              <p className="des">
                {data.weather ? <p>{data.wind.speed.toFixed()}km/h</p> : null}
              </p>
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
