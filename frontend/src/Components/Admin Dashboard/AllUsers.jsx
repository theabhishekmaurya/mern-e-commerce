import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { token } = useSelector((state) => state.auth);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/show-users`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const approveSeller = (email) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/admin/approve-seller/${email}`
      )
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/show-users`, {
            headers: { token },
          })
          .then((res) => {
            console.log(res);
            setUsers(res.data);
          });
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const deleteUser = (email) => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/admin/delete-user/${email}`
      )
      .then((res) => {
        axios
          .get(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/show-users`)
          .then((res) => {
            console.log(res);
            setUsers(res.data);
          });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Verified</TableCell>
            <TableCell align="right">Request for seller</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <h6>Loading...</h6>}
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((user) => (
            <TableRow key={user.firstName}>
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {user.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {user.type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {user.verified ? "Yes" : "No"}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {user.sellerReq ? "Requested" : "No"}
              </TableCell>
              {user.sellerReq && (
                <TableCell style={{ width: 160 }} align="right">
                  <Button onClick={() => approveSeller(user.email)}>
                    Approve
                  </Button>
                </TableCell>
              )}
              <TableCell style={{ width: 160 }} align="right">
                <Button onClick={() => deleteUser(user.email)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
