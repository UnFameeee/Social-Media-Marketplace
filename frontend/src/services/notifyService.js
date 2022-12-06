import { TimeToLeave } from "@mui/icons-material";
import { toast } from "react-toastify";

function showSuccess(title = "Success") {
  toast.success(title);
}

function showError(title = "Error", autoClose = 5000) {
  toast.error(title, autoClose);
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
