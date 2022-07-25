import React from "react";

const Todo = (props) => {
   const { todo } = props;

   return (
      <li className="flex items-center justify-center gap-4">
         <span className={`${todo.progress ? "line-through" : ""}`}>
            {todo.id} : {todo.title}
         </span>

         <input
            id="input-check"
            className="border border-indigo-600 outline-none"
            type="checkbox"
            checked={todo.progress}
            onChange={() => (props.onChange ? props.onChange(todo) : null)}
         />
      </li>
   );
};

export default Todo;
