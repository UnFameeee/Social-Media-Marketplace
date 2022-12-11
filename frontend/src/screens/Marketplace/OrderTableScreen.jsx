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
function OrderTableScreen({ orderLine, actionBtns, ...props }) {
  return (
    <div className="min-w-[1060px]">
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
            {orderLine?.map((item) => (
              <TableRow
                key={item.order_line_id}
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
                      {item?.product_image?.length > 0 ? (
                        <img
                          className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                          src={item?.product_image[0]?.link}
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = notFoundImage;
                          }}
                        />
                      ) : (
                        <img
                          className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-xl  brief-detail-img"
                          src={notFoundImage}
                          alt=""
                        />
                      )}
                    </div>
                    <span className="font-bold line-clamp-2">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
                >
                  <span className=" line-clamp-3">{item.quantity}</span>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.5rem", maxWidth: "10  0rem" }}
                >
                  <span className=" line-clamp-3">{item.price}</span>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                >
                  <span className=" line-clamp-2 font-bold">
                    {item.payment_status}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                >
                  <span className=" line-clamp-2 font-bold">
                    {item.shipping_status}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "1.5rem", maxWidth: "20rem" }}
                >
                  <div className=" flex flex-col gap-[1rem]">
                    {actionBtns?.map((btn) => (
                      <MUI.Button
                        disabled={
                          (btn.text == "Delete" &&
                            (item.shipping_status != "SHIPPING" || item.payment_status == "PURCHASED")) ||
                          (btn.text == "Receive" &&
                            item.shipping_status != "SHIPPING") ||
                          (btn.text == "Paid" &&
                            (item.shipping_status != "DELIVERED" ||
                              item.payment_status == "PURCHASED")) ||
                          (btn.text == "Shipping" &&
                            item.shipping_status != "WAITING FOR SHIPPER")
                        }
                        onClick={() => btn.handle(item.order_line_id)}
                      >
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
    </div>
  );
}

export default OrderTableScreen;
