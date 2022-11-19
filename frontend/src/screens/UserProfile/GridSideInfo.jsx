import { Avatar } from '@mui/material';

function GridSideInfo(props) {
  const {
    type,
    leftLabel,
    rightLabel,
    totalFriends,
    listImg,
    navigate,
  } = props;

  function goToFriend(id) {
    navigate(`/profile?id=${id}`);
  }

  return (
    <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem] ">
      <div className="flex flex-col">
        <div className="mb-[1rem]">
          <div className="flex items-center ">
            <span className="font-bold text-[2.3rem] flex-1">
              {leftLabel}
            </span>
            <button id="gridSideButton" onClick={rightLabel.onClick}>
              {rightLabel.text}
            </button>
          </div>

          {type === 'friendPhoto' && (
            <span className="text-[1.8rem] font-light">
              {totalFriends}
            </span>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-[0.5rem] ml-0 ">
          {/* photos */}
          {type === 'photo' &&
            listImg?.map((item, index) => {
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
                    {type === 'friendPhoto' && <span>Name</span>}
                  </li>
                );
              }
            })}

          {/* friends */}
          {type === 'friendPhoto' &&
            listImg?.map((item, index) => {
              return (
                <li key={index}>
                  <Avatar
                    src={item.url}
                    alt="item.name"
                    className="photoGridImage rounded-[1rem] cursor-pointer"
                    sx={{
                      height: '15rem',
                      width: '100%',
                      borderRadius: '0.8rem',
                      fontSize: '10rem',
                    }}
                    onClick={() => {
                      goToFriend(item.id);
                    }}
                  >
                    {item.name?.at(0)}
                  </Avatar>
                  {type === 'friendPhoto' && (
                    <span
                      className="font-semibold cursor-pointer hover:underline"
                      onClick={() => {
                        goToFriend(item.id);
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default GridSideInfo;
