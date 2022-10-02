import { Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';

const ButtonTooltip = (props) => {
  return (
    <>
      <Button data-tip data-for={props.id}>
        {props.children}
      </Button>
      <ReactTooltip id={props.id}>{props.tooltip}</ReactTooltip>
    </>
  );
};

export default ButtonTooltip;
