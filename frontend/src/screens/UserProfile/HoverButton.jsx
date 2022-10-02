import React from "react";
import { makeStyles } from "tss-react/mui";
function HoverButton(props) {
  const { classes } = useStyles();
  var flex1 = "";
  var ulGap=""
  if (props.flex1) {
    flex1 = "flex-1";
  }
  if(props.ulGap){
    ulGap= props.ulGap
  }
  return (
    <ul className={`display flex w-full mt-[1rem] gap-[${ulGap}] `}>
      {props.listButton &&
        props.listButton.map((button, index) => {
          return (
            <li
              key={index}
              className={`flex gap-[0.5rem] ${flex1} justify-center items-center px-[0.5rem] py-[0.3rem] rounded-lg hover:bg-slate-200 cursor-pointer`}
            >
              <div className={classes.root}>{button.icon}</div>
              <span className="text-[2rem]">{button.text}</span>
            </li>
          );
        })}
    </ul>
  );
}
const useStyles = makeStyles()(() => ({
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
}));
export default HoverButton;
