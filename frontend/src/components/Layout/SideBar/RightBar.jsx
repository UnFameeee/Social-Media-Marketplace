import { Box, IconButton, Typography } from "@mui/material";
import { EmergencyRecording, Search, MoreHoriz } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import "../Layout.css";
import FriendRequest from "../../FriendRequest/FriendRequest";
import FriendContact from "../../FriendContact/FriendContact";
import ProductSideBarDetails from "../../../screens/Marketplace/ProductSideBarDetails";

const useStyles = makeStyles()(() => ({
  scroll: {
    "&::-webkit-scrollbar": {
      width: "1rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
  },
}));

export default function RightBar(props) {
  const { classes, cx } = useStyles();
  const { marketplace } = props;
  if (marketplace) {
    return <ProductSideBarDetails />;
  } else
    return (
      <div className="right-bar">
        <Box
          className={cx(classes.scroll)}
          sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "var(--sidebar-width)",
            height: "calc(100vh - var(--navbar-height))",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              padding: "1.5rem 0 8px 0",
              boxShadow: "0px 24px 3px -24px black",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
              }}
            >
              <Typography>Friend Requests</Typography>
              <Typography>See all</Typography>
            </Box>
            <FriendRequest />
          </Box>
          <Box
            sx={{
              padding: "1.5rem 0 8px 0",
              // boxShadow: '0px 24px 3px -24px black',
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 8px",
              }}
            >
              <Typography>Contacts</Typography>
              <Box>
                <IconButton>
                  <EmergencyRecording style={{ fontSize: "2.5rem" }} />
                </IconButton>
                <IconButton>
                  <Search style={{ fontSize: "2.5rem" }} />
                </IconButton>
                <IconButton>
                  <MoreHoriz style={{ fontSize: "2.5rem" }} />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <FriendContact />
            </Box>
          </Box>
        </Box>
      </div>
    );
}
