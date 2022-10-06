import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Box } from "@mui/material";

const ImageSlider = () => {
  const images = [
    "https://sslimages.shoppersstop.com/sys-master/root/hd2/h6d/28356841766942/watches_Top-Banner-web20220929_wows.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/h87/h56/28257977696286/festive-home-page-web---hp-pagees-main-carousel-20220913.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/h1f/hc3/28356842160158/bedding_Top-Banner-web20220928_s0w.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/hde/hc6/28356842291230/footwear_Top-Banner-web20220929_0.jpg",
  ];
  return (
    <Box
      // disableGutters
      padding={{ xs: "5px 0px", md: "10px 0px" }}
    >
      <Carousel>
        {images.map((item) => (
          <Carousel.Item interval={4000}>
            <img className="d-block w-100" src={item} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageSlider;
