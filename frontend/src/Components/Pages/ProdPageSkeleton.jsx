import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  return (
    <Grid container m="0px" spacing={5}>
      {Array.from(new Array(8)).map((item, index) => (
        <Grid item xs={6} sm={4} md={3}>
          <Box
            height={{ xs: "350px", sm: "400px" }}
            width={{ xs: "200px", md: "300px" }}
          >
            <Skeleton variant="rectangular" height="80%" />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProdPageSkeleton() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media />
    </Box>
  );
}
