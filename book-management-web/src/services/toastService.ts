//@ts-ignore
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const toastSuccess = (message: string) => {
  return (
    toast.success(message),
    {
      autoclose: 5000,
      position: toast.POSITION.BOTTOM_RIGHT,
    }
  );
};

export const toastError = (message: string) => {
  return (
    toast.error(message),
    {
      autoclose: 5000,
      position: toast.POSITION.BOTTOM_RIGHT,
    }
  );
};
