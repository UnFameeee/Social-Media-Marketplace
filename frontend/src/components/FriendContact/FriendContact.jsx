import React from "react";
import { Avatar, Button, Typography } from "@mui/material";
function FriendContact() {
  return (
    <Button sx={{ width: "99%", justifyContent: "left" }}>
      <Avatar />
      <Typography sx={{ textTransform: "none", marginLeft: "10px" }}>
        Nguyễn Hoàng Hai Dụ
      </Typography>
    </Button>
  );
}

export default FriendContact;
