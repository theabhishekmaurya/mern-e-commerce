import { Box, Grid } from "@mui/material";
import React from "react";
import ProdFilter from "./ProdFilter";
import ProdItem from "./ProdItem";

const ProdGrid = ({ prod, setFilter, setSort, filter, sort }) => {
  return (
    <Box width={{ xs: "90%", sm: "90%", xl: "85%" }}>
      <ProdFilter
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <Grid container spacing={{ xs: 3, md: 3, xl: 14 }}>
        {prod.map((prod) => (
          <Grid key={prod._id} item xs={6} sm={4} md={3}>
            <ProdItem item={prod} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProdGrid;
