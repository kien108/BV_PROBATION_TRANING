import React, { useContext } from "react";
import { TodosContext } from "../pages/Todos";

const Todo = (props) => {
   const { todo } = props;
   const { dispatch } = useContext(TodosContext);
   const taskDone = `line-through text-gray-400`;

   const handelChangeStatus = (todo) => {
      dispatch({
         type: "done",
         payload: {
            id: todo.id,
         },
      });
   };

   return (
      <li className="flex items-center justify-center gap-4 text-[18px]">
         <span className={`${todo.progress ? "" : taskDone}`}>
            {todo.id} : {todo.title}
         </span>

         <input
            id="input-check"
            className="border border-indigo-600 outline-none"
            type="checkbox"
            checked={todo.progress}
            onChange={() => handelChangeStatus(todo)}
         />
      </li>
   );
};

export default Todo;
