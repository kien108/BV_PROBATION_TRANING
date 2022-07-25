import React, { useState } from "react";

const Modal = (props) => {
   return <div className="bg-black/40 fixed inset-0">{props.children}</div>;
};

export default Modal;

export const ModalContent = (props) => {
   const [todo, setTodo] = useState("");

   const btnStyle =
      "rounded-md bg-indigo-800 px-4 py-[6px] font-semibold min-w-[80px]";
   return (
      <div
         className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-indigo-600 ${props.className} rounded-lg w-[400px]`}
      >
         <label htmlFor="" className="text-xl font-bold mb-[1rem]">
            Todo content
         </label>
         <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="block w-full px-[10px] py-[4px] text-black rounded-md"
         />
         <div className="actions flex items-center gap-5 mt-4">
            <button
               className={`${btnStyle}`}
               onClick={() =>
                  props.addTodo({
                     id: props.id + 1,
                     title: todo,
                     progress: true,
                  })
               }
            >
               Add
            </button>
            <button
               className={`${btnStyle} bg-gray-50 text-indigo-600 border-[2px] border-indigo-700`}
            >
               Cancel
            </button>
         </div>

         {props.children}
      </div>
   );
};
