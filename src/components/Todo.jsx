import React from "react";

const Todo = (props) => {
   const { todo } = props;
   const taskDone = `line-through text-gray-400`;
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
            onChange={() => (props.onChange ? props.onChange(todo) : null)}
         />
      </li>
   );
};

export default Todo;
