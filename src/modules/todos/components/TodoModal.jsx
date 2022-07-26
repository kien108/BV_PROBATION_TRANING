import { useEffect, useState, useContext, useRef } from "react";
import { TodosContext } from "../pages/Todos";

const TodoModal = (props) => {
   const [todo, setTodo] = useState("");
   const { dispatch } = useContext(TodosContext);
   const inputRef = useRef(null);

   const btnStyle =
      "rounded-md bg-indigo-800 px-4 py-[6px] font-semibold min-w-[80px]";

   const handelAddTodo = (todo) => {
      if (!todo.trim()) {
         setTodo("");
         inputRef.current.style.border = "1px solid red";
         return;
      }

      dispatch({
         type: "add",
         payload: {
            todo: {
               id: props.id + 1,
               title: todo,
               progress: true,
            },
         },
      });

      if (props.onClose) props.onClose();
   };

   useEffect(() => {
      const triggerEnter = (e) => {
         if (e.keyCode === 13) {
            handelAddTodo(todo);
         }
      };

      document.addEventListener("keyup", triggerEnter);

      return () => document.removeEventListener("keyup", triggerEnter);
   }, [todo]);
   return (
      <div className="w-full">
         <label htmlFor="" className="text-xl font-bold mb-[0.8rem] block">
            Todo content
         </label>
         <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="block w-full px-[10px] py-[4px] text-black rounded-md"
         />
         <div className="actions flex items-center gap-5 mt-4 w-full justify-center">
            <button
               className={`${btnStyle}`}
               onClick={() => handelAddTodo(todo)}
            >
               Add
            </button>
            <button
               className={`${btnStyle} bg-gray-50 text-indigo-600 border-[2px] border-indigo-700`}
               onClick={() => (props.onClose ? props.onClose() : null)}
            >
               Cancel
            </button>
         </div>
      </div>
   );
};

export default TodoModal;
