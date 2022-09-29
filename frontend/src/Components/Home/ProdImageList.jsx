import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function ProdImageList() {
  return (
    <Box padding={{ xs: "10px 10px", md: "20px 0px" }}>
      <Box sx={{ width: "100%", 
      height:{xs:"300px", md:"600px"}, 
      overflowY: "scroll" 
      }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1555487505-8603a1a69755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Watch",
  },
  {
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Headphone",
  },
  {
    img: "https://images.unsplash.com/photo-1598460880248-71ec6d2d582b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Beauty Product",
  },
  {
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Shoe ",
  },
  {
    img: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Shirt ",
  },
  {
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Pant",
  },
  {
    img: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    title: "Pant",
  },
  {
    img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Beauty Prod",
  },
  {
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    title: "Specs",
  },
  {
    img: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
    title: "Alexa",
  },
];
