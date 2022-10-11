import { Radio } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const SelectAddress = ({ addresses, setSelected }) => {
  return (
    <Box
      borderRadius="5px"
      height="220px"
      overflow="scroll"
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      p={3}
    >
      <FormControl>
        <RadioGroup
          name="address-radio"
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          {addresses.map((elem) => (
            <Stack direction="row">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                <FormControlLabel
                  value={elem._id}
                  control={<Radio size="small" />}
                />
              </Box>
              <Box>
                <h6 style={{ margin: 0 }}>{elem.firstName}</h6>
                <p style={{ margin: 0 }}>{elem.addLine1}</p>
                <p>
                  {elem.city}, {elem.state}
                </p>
              </Box>
            </Stack>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectAddress;
