import React from "react";

const Modal = (props) => {
   const handelCloseModal = (e) => {
      if (props.onClose) props.onClose();
   };
   return (
      <div>
         <div
            className="bg-black/40 fixed inset-0 z-10"
            onClick={handelCloseModal}
         ></div>
         {props.children}
      </div>
   );
};

export default Modal;

export const ModalContent = (props) => {
   return (
      <div
         className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-indigo-600 ${props.className} rounded-lg w-[400px] z-20`}
      >
         {props.children}
      </div>
   );
};
