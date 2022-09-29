import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const GridCategories = () => {
  const imgArr = [
    "https://sslimages.shoppersstop.com/sys-master/root/h53/h44/28356857856030/4-Widgets-Stop-Web---smart--20908823fhh.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/h08/h2d/28250988478494/More-Brands-Footwear-Pointed-Toe-4-Widgets-Web-aaaa_hhd.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/h4d/hf5/28257974222878/4-Widgets-Fratnii-Web-samrt-pants-20220913-hp-pages-exclu.jpg",
    "https://sslimages.shoppersstop.com/sys-master/root/h4c/h6d/28274020712478/Tote_4-Widgets-web---2022-09-16-hp-page.jpg",
  ];
  return (
    <Box padding={"30px 0"}>
      <Grid container spacing={1}>
        {imgArr.map((image) => (
          <Grid item xs={12} sm={6} md={3} xl={3}>
            <Box
              className="category-image"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={420}
              sx={{
                backgroundPosition: "center",
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <Button
                className="category-img-btn"
                // sx={{ display: "none" }}
                variant="outlined"
              >
                Shop Now
              </Button> */}
            </Box>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4}>
          <Box
            className="category-image"
            height={420}
            sx={{
              backgroundPosition: "center",
              backgroundImage: `url(${"https://sslimages.shoppersstop.com/sys-master/root/hf4/hf6/28250969440286/web_PUMA_ADDIDAS_3x3-Widgets_12092022replace.jpg"})`,
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            className="category-image"
            height={420}
            sx={{
              backgroundPosition: "center",
              backgroundImage: `url(${"https://sslimages.shoppersstop.com/sys-master/root/hb3/hfa/28250969571358/web_alt-life-alcis_3x3Widgets_12092022replace.jpg"})`,
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} display={{ sm: "none", md: "block" }}>
          <Box
            className="category-image"
            height={420}
            sx={{
              backgroundPosition: "center",
              backgroundImage: `url(${"https://sslimages.shoppersstop.com/sys-master/root/h65/h9a/28250976944158/SKECHERS_3x3-Widgets--webs-size-hp--202209-13-dont-miss-textx.jpg"})`,
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridCategories;
