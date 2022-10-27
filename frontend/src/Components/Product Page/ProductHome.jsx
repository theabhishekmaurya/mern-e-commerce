import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProdGrid from "./ProdGrid";
import { Box } from "@mui/system";
import ProdPageSkeleton from "../Pages/ProdPageSkeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductHome = () => {
  const { active } = useSelector((state) => state.activeProd);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const totalPages = useRef();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          process.env.REACT_APP_SERVER_BASE_URL
        }/admin/show-products?page=${page}&limit=${10}&filter=${active}&sort=${sort}`
      )
      .then((res) => {
        setProducts(res.data.products);
        totalPages.current = res.data.pages;
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, [page, active, sort]);

  const handleChange = (e, p) => {
    console.log(p);
    setPage(p);
  };

  return (
    <Box
      display="flex"
      padding="0px 10px"
      flexDirection="column"
      alignItems="center"
    >
      {loading && <ProdPageSkeleton />}
      <ProdGrid
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        prod={products}
      />

      <Stack spacing={2} mt="5%">
        <Pagination
          onChange={handleChange}
          count={totalPages.current}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default ProductHome;
