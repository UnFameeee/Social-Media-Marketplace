import { toast } from "react-toastify";

function showSuccess(title = "Success") {
  toast.success(title, {
    autoClose: 1000,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    pauseOnHover: false,
    theme: "dark",
  });
}

function showError(title = "Error") {
  toast.error(title,{
    autoClose: 1000,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    pauseOnHover: false,
    theme: 'dark',
  });
}

function showWarn(title = "Warning") {
  toast.warn(title);
}

function showInfo(title = "Success") {
  toast.info(title);
}

export const notifyService = {
  showSuccess,
  showError,
  showWarn,
  showInfo,
};
