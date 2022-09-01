import React from "react";
import { makeStyles } from "tss-react/mui";
function SideBarFunction(props) {
  const { classes } = useStyles();
  console.log(props.listFeature);
  return (
    <>
      <div className="w-full flex justify-center">
        <button className="w-[80%] px-[4rem] py-[1.5rem] bg-blue8f3 text-white rounded-md my-[5%]">
          Create New
        </button>
      </div>
      <div className="listFunction flex ">
        <ul className="flex flex-col justify-center w-full gap-[0.5rem]">
          {props.listFeature.map((feature, index) => {
            return (
              <li key={index} className="leftHomeSideBarLi ">
                <div className={classes.root}>{feature.iconName}</div>
                <div>
                  <span className="text-[2rem]">{feature.text}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
const useStyles = makeStyles()(() => ({
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
}));
export default SideBarFunction;
