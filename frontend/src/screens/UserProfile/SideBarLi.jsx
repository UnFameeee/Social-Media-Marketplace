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
      descriptionDisplay: 'Educates at ',
      icon: <School />,
    },
    {
      descriptionProps: 'location',
      descriptionDisplay: 'Lives in ',
      icon: <Home />,
    },
    {
      descriptionProps: 'career',
      descriptionDisplay: 'Works at ',
      icon: <Work />,
    },
  ];

  var matched = template
    .filter((x) => x.descriptionProps == props.description[0])
    .map((x) => {
      return x;
    })[0];

  return (
    <>
      {matched && props.description[1] && (
        <li id="sideBarLi">
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
