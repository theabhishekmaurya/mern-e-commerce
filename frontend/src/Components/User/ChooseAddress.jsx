import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CartDetails from "./CartDetails";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddressForm from "./AddressForm";
import SelectAddress from "./SelectAddress";
import axios from "axios";
import { resetCart } from "../Redux/cartSlice";
import PaymentLoading from "../Pages/PaymentLoading";

const ChooseAddress = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const { coming_from, prodId } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/address`, {
        headers: { token },
      })
      .then((res) => {
        setAddresses(res.data);
      });
  }, []);

  console.log(cartItems, prodId);
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const handleCheckout = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Load failed");
    }

    const data = await axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/order/razorpay`, {
        amount: Math.round(cartTotal - cartTotal * 0.1 - cartTotal * 0.0015),
      })
      .then((res) => res.data);

    const products = cartItems.map((elem) => ({
      quantity: elem.quantity,
      product: elem.product._id,
    }));

    const options = {
      key: process.env.REACT_APP_RAZORPAY_ID,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Mern E-Shop",
      description: "Test Transaction",
      image:
        "https://res.cloudinary.com/dgelxfhx7/image/upload/v1666703771/jvgug7aphyjql8m9dloi.png",

      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        setLoading(true);
        await axios
          .post(
            `${process.env.REACT_APP_SERVER_BASE_URL}/order/razorpay/success`,
            {
              items:
                coming_from === "cart"
                  ? products
                  : [
                      {
                        quantity: prodId.split("_")[1],
                        product: prodId.split("_")[0],
                      },
                    ],
              amount: Math.round(
                cartTotal - cartTotal * 0.1 - cartTotal * 0.0015
              ),
              address: selected,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
            {
              headers: { token },
            }
          )
          .then((res) => {
            console.log(res);
          });

        console.log("success");
        if (coming_from === "cart") {
          dispatch(resetCart());
          await axios
            .delete(`${process.env.REACT_APP_SERVER_BASE_URL}/cart`, {
              headers: { token },
            })
            .then((res) => console.log(res));
        }
        setLoading(false);
        navigate(`/order-success/${response.razorpay_order_id}`);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };
  if (loading) return <PaymentLoading />;
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
            <AddressForm
              setAddresses={setAddresses}
              setOpenForm={setOpenForm}
              openForm={openForm}
            />
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
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default ChooseAddress;
