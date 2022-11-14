function SideBarLi(props) {
  const template = [
    {
      descriptionProps: 'school',
      descriptionDisplay: 'Educates at ',
      icon: props.icon.school,
    },
    {
      descriptionProps: 'location',
      descriptionDisplay: 'Lives in ',
      icon: props.icon.location,
    },
    {
      descriptionProps: 'career',
      descriptionDisplay: 'Works at ',
      icon: props.icon.career,
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
