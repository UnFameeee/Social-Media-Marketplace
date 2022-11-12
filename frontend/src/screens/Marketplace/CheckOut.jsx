import React from "react";
import { Box, Typography, Pagination } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MUI from "../../components/MUI";
import macbook_example from "../../assets/macbook.jpeg";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
function CheckOut() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <div className="CheckOut pt-[5%] px-[10%]  ">
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            displayPrint: "flex",
          }}
          style={{}}
        >
          <div className="header flex items-center bg-white px-[2rem] mb-[1rem] rounded-md">
            <div className="header-title flex-1">
              <span className=" text-[2.5rem] font-bold">Order Overview</span>
            </div>
            <TabList
              TabIndicatorProps={{
                style: {
                  background: "var(--primary-color)",
                  flex: "1",
                },
              }}
              onChange={handleChange}
            >
              <Tab
                className="brief-details flex-1"
                label="Information"
                value="1"
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                  flex: "1",
                }}
              />
              <Tab
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                }}
                className="cart flex-1"
                label="Payment Details"
                value="2"
              />
              <Tab
                style={{
                  color: "var(--primary-color)",
                  textTransform: "capitalize",
                }}
                className="cart flex-1"
                label="Complete Order"
                value="3"
              />
            </TabList>
          </div>
        </Box>
        <div className=" shadow-lg">
          <TabPanel value="1" sx={{ padding: "1.2rem", background: "white" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "1.8rem" }}>Item</TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Description
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Price
                    </TableCell>
                    <TableCell style={{ fontSize: "1.8rem" }} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontSize: "1.5rem" }}
                      >
                        <div className="flex gap-[1rem]">
                          <div className="card-image mb-[1rem]">
                            <img
                              className="min-w-[6rem] max-h-[6rem] rounded-lg shadow-xl  brief-detail-img"
                              src={`https://source.unsplash.com/random/1000x902/?macbook`}
                              alt=""
                            />
                          </div>
                          <span className="font-bold line-clamp-2">
                            Product name Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Atque iste vitae distinctio
                            consequuntur voluptate expedita exercitationem,
                            fugit reiciendis? Nam, magni!
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
                      >
                        <span className=" line-clamp-3">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Minima laudantium, suscipit veniam nobis animi
                          voluptatibus in dolorem architecto perspiciatis? Iusto
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "10rem" }}
                      >
                        <div className="w-full">
                          <input
                            defaultValue={1}
                            min={0}
                            max={100}
                            type="number"
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                      >
                        <span className=" line-clamp-2">
                          9999999999999999999999
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                      >
                        <MUI.BetterIconButton>
                          <DeleteForeverIcon style={{ fontSize: "3rem" }} />
                        </MUI.BetterIconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="total flex flex-col justify-end text-end font-semibold text-[2.2rem] mr-[2rem] ">
              <span>Total</span>
              <span>192222222222222$</span>
            </div>
            <div className="Pagination mt-[1rem] flex justify-end">
              <Typography>Page: {page}</Typography>
              <Pagination
                page={page}
                onChange={handleChangePage}
                count={11}
                defaultPage={1}
                siblingCount={0}
                variant="outlined"
                size="large"
              />
            </div>
          </TabPanel>
        </div>
        <TabPanel value="2" sx={{ padding: "1.2rem", background: "white" }}>
          <div className="payment-details-wrapper flex py-[1rem]">
            <div className="summary-order flex-1 px-[2rem]">
              <span className="title-text font-bold text-[2.5rem]">
                Summary Order
              </span>
              <p className=" max-w-[35rem]">
                Check your item and select your shipping for better experience
                order item.
              </p>
              <ul className="flex gap-[1rem] flex-col max-h-[30rem] shadow-md overflow-y-scroll mt-[1rem] list-item-order border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl">
                {[...Array(15)].map((index) => (
                  <li
                    key={index}
                    className="item-orders flex gap-[1rem] items-center "
                  >
                    <div className="card-image mb-[1rem] rounded-[2rem]">
                      <img
                        className="w-[10rem] max-h-[7rem] rounded-lg shadow-md object-cover"
                        src={macbook_example}
                        alt=""
                      />
                    </div>
                    <div className="cart-item-info w-full overflow-hidden">
                      <span className="name line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo quam nihil modi aspernatur a odio, officia qui
                      </span>
                      <div className="cart-item-info-price flex items-center">
                        <div className="flex-1 flex gap-[1.2rem] items-center">
                          <span className="text-[1.5rem] font-light">999$</span>
                          <span>x</span>
                          <input
                            className="border-[1px] rounded-lg outline-none border-gray-300 w-[5rem]"
                            type="number"
                            defaultValue={1}
                          />
                        </div>
                        <div
                          className="text-[2rem]"
                          style={{ color: "var(--primary-color)" }}
                        >
                          <span>$1888</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="shipping-types mt-[1rem] flex flex-col gap-[1rem]">
                {[...Array(2)].map((index) => (
                  <li key={index} className="shipping-type ">
                    <span className="shipping-title capitalize font-semibold text-[2rem]">
                      Available shipping methods!
                    </span>
                    <div className="shipping-check-btn flex gap-[1rem] items-center border-[0.5px] border-gray-400 p-[1.5rem] rounded-xl  ">
                      <div className="card-image mb-[1rem] rounded-[2rem]">
                        <img
                          className="w-[10rem] max-h-[7rem] rounded-lg shadow-md object-cover"
                          src={macbook_example}
                          alt=""
                        />
                      </div>
                      <div className="cart-item-info w-full flex gap-[1rem]">
                        <div className="flex flex-col">
                          <span className="name line-clamp-1 font-semibold">
                            Fedex Delivery
                          </span>
                          <span className="text-[1.5rem] line-clamp-1 font-light">
                            Delivery 2-3 days work
                          </span>
                        </div>
                        <div className="cart-item-info-price flex justify-center items-center gap-[1rem]">
                          <div className="flex gap-[1rem]">
                            <span className="font-semibold">Free</span>
                            <input type="radio" name="shipping" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="payment-details flex-1 px-[2rem]">
              <span className="title-payment-details font-bold text-[2.5rem]">
                Payment Details
              </span>
              <p className=" max-w-[35rem]">
                Complete your purchase item by providing your payment detail
                order
              </p>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="3" sx={{ padding: "1.2rem", background: "white" }}>
          <img
            src={`https://source.unsplash.com/random/1920x1200/?congratulations `}
            alt=""
            className="w-full max-h-[60vh] object-cover"
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default CheckOut;
