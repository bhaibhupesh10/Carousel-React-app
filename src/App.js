import React from "react";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import CarouselDots from "./components/CarouselDots";

function App() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [classDiv, setClassdiv] = useState("");
  const [curImg, setCurImg] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const pages = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

  const query = [
    { label: "Do not filter", value: "" },
    { label: "Nature", value: "nature" },
    { label: "Flower", value: "flower" },
    { label: "Birds", value: "birds" },
    { label: "Animal", value: "animal" },
  ];

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1, pagination: false },
    { width: 850, itemsToShow: 6, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 6, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 8, itemsToScroll:2},
    { width: 1750, itemsToShow: 9,itemsToScroll:3 },
  ];

  const perPage = 50; // Number of images per page

  useEffect(() => {
    let URL = "";

    // Check if "Do not filter" is selected
    if (selectedPackage !== "") {
      // Fetch images based on the selected package
      URL = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${selectedPackage}&client_id=U2pS9emdUJKHneIjaV0wWW0xL9_U7K5gK7PPNNTGKt8&per_page=${perPage}`;
    } else {
      // Fetch all random images
      URL = `https://api.unsplash.com/photos?page=${pageNo}&client_id=U2pS9emdUJKHneIjaV0wWW0xL9_U7K5gK7PPNNTGKt8&per_page=${perPage}`;
    }

    axios.get(URL).then((res) => {
      const responseData = res.data;

      // Check if responseData is an array before setting it to state
      if (Array.isArray(responseData)) {
        setData(responseData);
        setCurImg(responseData[0]);
        setCurrentIndex(0); // Reset currentIndex
      } else if (responseData.results && Array.isArray(responseData.results)) {
        // Handle the case where the API returns an object with a "results" property
        setData(responseData.results);
        setCurImg(responseData.results[0]);
        setCurrentIndex(0); // Reset currentIndex
      } else {
        console.error("API response is not in the expected format:", responseData);
      }
    });
  }, [selectedPackage, pageNo]);

  const handleClick = (image, index) => {
    setCurImg(image);
    setClassdiv("border");
    setCurrentIndex(index);
  };

  const handleQuery = (e) => {
    setSelectedPackage(e.target.value);
    setCurrentIndex(0); // Reset currentIndex
  };

  const handlePage = (e) => {
    setPageNo(e.target.value);
  };

  return (
    <div className="App">
      <div className="headingImage"></div>
      <div className="mainImage">
        <img src={curImg?.urls?.small} alt={curImg?.id} />
      </div>
      <p className="image-name">{curImg?.alt_description}</p>
      <CarouselDots />
      <div className="imageViewer">


        <div className="selected">
          <div className="indexImage">File selected: {`${currentIndex+1}/${data.length}`} &nbsp;
          <select onChange={handleQuery}>
            {query.map((q) => (
              <option value={q.value} key={q.value}>
                {q.label}
              </option>
            ))} 
          </select> &nbsp;
          <select onChange={handlePage}>
            {pages.map((p) => (
              <option value={p.value} key={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <CarouselDots/>
          </div>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.map((image, index) => (
            <div key={image?.id} className="carousel-item">
              <img
                src={image?.urls?.small}
                alt={image?.id}
                onClick={() => handleClick(image, index)}
                className={curImg?.id === image?.id ? "border" : ""}
              />
              <CarouselDots />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default App;
