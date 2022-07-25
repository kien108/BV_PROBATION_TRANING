import React, { useCallback, useEffect, useState } from "react";
import Modal, { ModalContent } from "./Modal";
import Todo from "./Todo";

const Todos = () => {
   const [todos, setTodos] = useState([
      {
         id: 1,
         title: "Todo1",
         progress: true,
      },
      {
         id: 2,
         title: "Todo2",
         progress: false,
      },
   ]);
   const [showAddTodo, setShowAddTodo] = useState(false);

   const handelChangeStatus = (todo) => {
      setTodos((prev) => {
         return [
            ...prev.map((item) =>
               item.id === todo.id
                  ? { ...item, progress: !item.progress }
                  : item
            ),
         ];
      });
   };

   const addTodo = (todo) => {
      setTodos((prev) => [...prev, todo]);
      setShowAddTodo(false);
   };

   const closeTodo = useCallback(() => {
      setShowAddTodo(false);
   }, [showAddTodo]);

   console.log(todos);

   return (
      <div className="bg-indigo-500 w-[500px] text-white px-[15px] py-[20px] rounded-lg">
         <h1 className="font-bold text-2xl mb-[1rem]">Todo List</h1>
         <button
            className="cursor-pointer bg-indigo-700 rounded-lg px-[12px] py-[6px] mb-[1rem]"
            onClick={() => setShowAddTodo((prev) => !prev)}
         >
            Add Todo
         </button>

         <div className="todos border-[2px] rounded-md border-indigo-700 py-[30px]">
            {todos?.length > 0 &&
               todos.map((todo, index) => (
                  <Todo key={index} todo={todo} onChange={handelChangeStatus} />
               ))}
         </div>

         {showAddTodo && (
            <Modal onClose={closeTodo}>
               <ModalContent className="flex items-center flex-col p-[20px]">
                  <TodoModal
                     addTodo={addTodo}
                     id={todos.length}
                     onClose={closeTodo}
                  />
               </ModalContent>
            </Modal>
         )}
      </div>
   );
};

const TodoModal = (props) => {
   const [todo, setTodo] = useState("");

   const btnStyle =
      "rounded-md bg-indigo-800 px-4 py-[6px] font-semibold min-w-[80px]";

   const handelAddTodo = (todo) => {
      props.addTodo({
         id: props.id + 1,
         title: todo,
         progress: true,
      });
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

export default Todos;
