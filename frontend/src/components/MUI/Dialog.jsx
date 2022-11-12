import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { BetterIconButton } from './Button/IconButton';
import Button from './Button/Button';

export default function ConfirmDialog(props) {
  const {
    modalProps,
    clickAwayClose = false,
    title,
    actionName,
    confirmAction,
  } = props;

  function handleClose() {
    modalProps[1](false);
  }

  return (
    <Dialog
      open={modalProps[0]}
      {...(clickAwayClose && { onClose: handleClose })}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-center" sx={{padding: '16px 12px 16px 24px'}}>
        <span className="flex-1">{title}</span>
        <BetterIconButton className='[&>button>svg]:text-[2rem]' onClick={handleClose}>
          <Close />
        </BetterIconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to {actionName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: '8px 24px 16px 24px'}}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirmAction}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
