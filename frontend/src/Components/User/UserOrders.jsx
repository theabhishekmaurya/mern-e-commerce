import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserAddresses = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/order/get-order`, {
        headers: { token },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      borderRadius="5px"
      overflow="scroll"
      maxHeight={800}
      width={{ xs: "90%", md: "50%", xl: "40%" }}
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      p={3}
    >
      {loading && <h6>Loading Orders ...</h6>}
      {orders.length === 0 && !loading && <h6>No order found</h6>}
      {orders.map((order) => (
        <Box
          p={1}
          borderRadius="5px"
          mb={2}
          boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
        >
          {order.items.map((prod) => {
            return (
              <Stack
                maxHeight={200}
                overflow="scroll"
                m={1}
                direction="row"
                spacing={3}
              >
                <img
                  style={{
                    width: "20%",
                  }}
                  src={prod.product.image}
                />
                <Box>
                  <p style={{ margin: 0 }}>
                    <b>{prod.product.title}</b>
                  </p>
                  <p>Quantity : {prod.quantity}</p>
                </Box>
              </Stack>
            );
          })}
          <Stack m={1} mb={2} mt={2}>
            <p style={{ margin: 0 }}>
              <b>{order.address.firstName}</b>
            </p>
            <p style={{ margin: 0 }}>
              {order.address.addLine1}, {order.address.city}
            </p>
            <p>
              Total :
              <b>
                {" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(order.amount)}{" "}
              </b>
            </p>
            <p style={{ margin: 0 }}>
              <b>Ordered at : {order.createdAt.split("T")[0]}</b>
            </p>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default UserAddresses;
