import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MUI from "../../components/MUI";
import notFoundImage from "../../assets/noimage_1.png";
import MarketPlaceLeftBar from "./MarketPlaceLeftBar";
function OrderTableScreen({ actionBtns, ...props }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "1.8rem" }}>Item</TableCell>
            <TableCell style={{ fontSize: "1.8rem" }} align="center">
              Quantity
            </TableCell>
            <TableCell style={{ fontSize: "1.8rem" }} align="center">
              Price
            </TableCell>
            <TableCell style={{ fontSize: "1.8rem" }} align="center">
              Payment Status
            </TableCell>
            <TableCell style={{ fontSize: "1.8rem" }} align="center">
              Shipping Status
            </TableCell>
            <TableCell style={{ fontSize: "1.8rem" }} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)]?.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="item"
                style={{ fontSize: "1.5rem" }}
              >
                <div className="flex gap-[1rem]">
                  <div className="card-image mb-[1rem]">
                    <img
                      className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                      src={item?.product_image[0]?.link}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = notFoundImage;
                      }}
                    />
                    <img
                      className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                      src={notFoundImage}
                      alt=""
                    />
                  </div>
                  <span className="font-bold line-clamp-2">name</span>
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
              >
                <span className=" line-clamp-3">22</span>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
              >
                <span className=" line-clamp-3">622</span>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
              >
                <span className=" line-clamp-2 font-bold">pending</span>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
              >
                <span className=" line-clamp-2 font-bold">pending</span>
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
              >
                <div className=" flex flex-col gap-[1rem]">
                  {actionBtns?.map((btn) => (
                    <MUI.Button onClick={btn.handle}>
                      <span>{btn.text}</span>
                    </MUI.Button>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTableScreen;
