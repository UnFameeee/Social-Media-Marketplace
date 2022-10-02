import React from "react";

function FullWidthHr(props) {
  var marginTop="";
  if (props.maginTop) {
     marginTop = props.maginTop;
  }
  return (
    <hr className={`mt-[1rem] h-[0.15rem] border-0 bg-slate-300 rounded-sm w-full ${marginTop} `} />
  );
}

export default FullWidthHr;
