import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import axios from "axios";
import Loading from "../Pages/Loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BecomeSeller({ setBecomeSeller, open }) {
  const { token } = useSelector((state) => state.auth);

  const [sellerReq, setSellerReq] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const handleClose = () => {
    setBecomeSeller(false);
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/check-seller-request`,
        {
          headers: { token },
        }
      )
      .then((res) => {
        if (res.data) {
          setSellerReq(true);
          setLoading(false);
        } else {
          setSellerReq(false);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  const handleSellerRequest = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/send-seller-request`,
        {
          headers: { token },
        }
      )
      .then((res) => {
        setLoading(false);
        dispatch(login(res.data));
        setSellerReq(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        handleClose();
      });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Become a seller</DialogTitle>
        {loading && <Loading />}
        {sellerReq ? (
          <>
            <DialogContent>
              <DialogContentText>
                Request for becoming a seller already sent, please wait for
                approval
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                Send a request to become a seller? approval will be done by
                admin.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSellerRequest}>Send Request</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
