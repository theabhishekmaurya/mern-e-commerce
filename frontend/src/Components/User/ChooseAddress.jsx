import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import CartDetails from "./CartDetails";
import { useNavigate, useParams } from "react-router-dom";
import AddressForm from "./AddressForm";
import SelectAddress from "./SelectAddress";
import axios from "axios";

const ChooseAddress = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const { coming_from } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("");

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/address`, {
        headers: { token },
      })
      .then((res) => {
        setAddresses(res.data);
      });
  }, []);

  return (
    <Stack
      margin={{ xs: "20px ", md: "20px 40px", xl: "20px 100px" }}
      direction={{ xs: "coloumn", md: "row" }}
      spacing={2}
    >
      <Stack
        width={{ xs: "100%", md: "120%", xl: "60%" }}
        margin={{ xs: "none", xl: "0 30px" }}
        height="500px"
        overflow="scroll"
        borderRadius="5px"
        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
      >
        <Box padding={2}>
          <SelectAddress setSelected={setSelected} addresses={addresses} />
        </Box>
        <Button className="link" onClick={() => setOpenForm(!openForm)}>
          {openForm ? "Close Form" : " + Add a new address "}{" "}
        </Button>
        <Box padding={5}>
          {openForm && (
            <AddressForm setAddresses={setAddresses} setOpenForm={setOpenForm} openForm={openForm} />
          )}
        </Box>
      </Stack>
      <Box width={{ xs: "100%", xl: "50%" }}>
        <CartDetails
          total={cartTotal}
          cartItems={coming_from == "cart" ? cartItems : [1]}
        />
        <Box
          width={{ xs: "100%", md: "80%", xl: "60%" }}
          display="flex"
          justifyContent="center"
        >
          <Button
            fullWidth
            size="large"
            variant="contained"
            id="primaryBgColor"
            disabled={!selected}
            // onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default ChooseAddress;
