import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Container, Typography, Paper, TextField } from "@mui/material";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Delete } from "@material-ui/icons";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";

const OrderSchedule = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  const getOrders = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/order/all`);
      setOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("Orders is Empty");
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const removeOrder = async (itemId) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/order/${itemId}`);
      if (result) {
        toast.success("Removed");
        getOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Filtered orders based on the search term
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center">
        <div class="flex justify-center items-center">
          <h1 class="text-4xl font-bold text-gray-800">Order Management</h1>
        </div>
      </div>

      <Container maxWidth={"800px"}>
        <Paper sx={{ width: "100%", marginTop: 2 }}>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <TextField
              label="Search by Customer Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              sx={{ width: "300px" }}
            />
          </Box>
          <TableContainer sx={{ maxHeight: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Placed Date</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Card Number</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row._id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.cardNo}</TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          removeOrder(row._id);
                        }}
                        className="cursor-pointer"
                      >
                        <Delete color="error" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default OrderSchedule;
