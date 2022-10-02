import React from "react";
import { makeStyles } from "tss-react/mui";
function SideBarLi(props) {
  const { classes } = useStyles();
  return (
    <li className="flex items-center gap-[1rem] ">
      <div className={classes.root}>{props.icon}</div>
      <span className="">{props.text}</span>
    </li>
  );
}
const useStyles = makeStyles()(() => ({
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
}));
export default SideBarLi;
