import { Radio } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useSelector } from "react-redux";

const UserAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/address`, {
        headers: { token },
      })
      .then((res) => {
        setAddresses(res.data);
        setLoading(false);
      });
  }, []);
  return (
    <Box
      borderRadius="5px"
      overflow="scroll"
      maxHeight={800}
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      p={3}
      mb={50}
    >
      <FormControl>
        <RadioGroup
          name="address-radio"
          onChange={(e) => {
            // setSelected(e.target.value);
          }}
        >
          {loading && <h6>Loading Adresses ...</h6>}
          {addresses.length === 0 && !loading && <h6>No address added</h6>}
          {addresses.map((elem) => (
            <Stack direction="row">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <FormControlLabel
                  value={elem._id}
                  control={<Radio size="small" disabled />}
                />
              </Box>
              <Box>
                <h6 style={{ margin: 0 }}>
                  {elem.firstName} {elem.lastName}
                </h6>
                <p style={{ margin: 0 }}>{elem.addLine1}</p>
                <p>
                  {elem.city}, {elem.state}, {elem.country}
                </p>
              </Box>
            </Stack>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default UserAddresses;
