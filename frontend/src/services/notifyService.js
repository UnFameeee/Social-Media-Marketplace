import { toast } from 'react-toastify';

function showSuccess(title = 'Success') {
  toast.success(title);
}

function showError(title = 'Error') {
  toast.error(title);
}

function showWarn(title = 'Warning') {
  toast.warn(title);
}

function showInfo(title = 'Success') {
  toast.info(title);
}

export const notifyService = {
  showSuccess,
  showError,
  showWarn,
  showInfo,
};
