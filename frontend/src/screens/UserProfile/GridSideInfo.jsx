import React from "react";

function GridSideInfo(props) {
    return (
      <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem] ">
        <div className="flex flex-col">
          <div className="mb-[1rem]">
            <div className="flex items-center ">
              <span className="font-bold text-[2.3rem] flex-1">
                {props.leftLabel}
              </span>
              <span className=" text-center text-blue8f3">
                {props.rightLabel}
              </span>
            </div>
            {props.type === "friendPhoto" && (
              <span className="text-[1.8rem] font-light">690 friends</span>
            )}
          </div>
          <ul className="grid grid-cols-3 gap-[0.5rem] ml-0 ">
            {props.type === "photo" &&
              props.listImg &&
              props.listImg.map((item, index) => {
                if (index === 2) {
                  return (
                    <li key={index}>
                      <img
                        src={item.url}
                        alt=""
                        className="photoGridImage rounded-tr-[1rem]"
                      />
                    </li>
                  );
                } else if (index === 0) {
                  return (
                    <li key={index}>
                      <img
                        src={item.url}
                        alt=""
                        className="photoGridImage rounded-tl-[1rem] "
                      />
                    </li>
                  );
                } else if (index === 6) {
                  return (
                    <li key={index}>
                      <img
                        src={item.url}
                        alt=""
                        className="photoGridImage rounded-bl-[1rem] "
                      />
                    </li>
                  );
                } else if (index === 8) {
                  return (
                    <li key={index}>
                      <img
                        src={item.url}
                        alt=""
                        className="photoGridImage rounded-br-[1rem] "
                      />
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <img
                        src={item.url}
                        alt=""
                        className="photoGridImage"
                      />
                      {props.type === "friendPhoto" && <span>Name</span>}
                    </li>
                  );
                }
              })}
            {props.type === "friendPhoto" &&
              props.listImg &&
              props.listImg.map((item, index) => {
                return (
                  <li key={index}>
                    <img
                      src={item.url}
                      alt=""
                      className="photoGridImage rounded-[1rem]"
                    />
                    {props.type === "friendPhoto" && <span className=" font-semibold">{item.name}</span>}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
}

export default GridSideInfo;
