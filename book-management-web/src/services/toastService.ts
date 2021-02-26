//@ts-ignore
// import React, { useRef } from "react";
//@ts-ignore
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
// const toastSuccess = (message: string) => {
//   const toastId = useRef(null);

//   const notify = () => {
//     if (!toast.isActive(toastId.current)) {
//       (toastId.current = toast.success(message)),
//         {
//           autoclose: 5000,
//           position: toast.POSITION.BOTTOM_RIGHT,
//         };

//       return toastId.current;
//     }
//   };

//   return { notify };
// };

// export default toastSuccess;

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
