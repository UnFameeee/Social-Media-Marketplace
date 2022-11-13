import {
  School,
  Home,
  Work,
  // Favorite,
  // AccessTimeFilled,
  // RssFeed,
} from '@mui/icons-material';
function SideBarLi(props) {

  const template = [
    {
      descriptionProps: 'school',
      descriptionDisplay: 'Educated at ',
      icon: <School />,
    },
    {
      descriptionProps: 'location',
      descriptionDisplay: 'Lives in ',
      icon: <Home />,
    },
    {
      descriptionProps: 'career',
      descriptionDisplay: 'Work at ',
      icon: <Work />,
    },
    // { descriptionDisplay: 'Single', icon: <Favorite /> },
    // { descriptionDisplay: 'Joined on October 2014', icon: <AccessTimeFilled /> },
    // { descriptionDisplay: 'Followed by 52 people', icon: <RssFeed /> },
  ];

  var matched = template
    .filter((x) => x.descriptionProps == props.description[0])
    .map((x) => {
      return x;
    })[0];

  return (
    <>
      {matched && props.description[1] && (
        <li className="flex items-center gap-[1rem] [&>svg]:text-[3rem]">
          {matched?.icon}
          <span>
            {matched?.descriptionDisplay + props.description[1]}
          </span>
        </li>
      )}
    </>
  );
}

export default SideBarLi;
