import React, { useState } from "react";
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
   };

   console.log(todos);
   return (
      <div className="bg-indigo-500 w-[500px] h-[500px] text-white p-[15px]">
         <h1 className="font-bold text-2xl mb-[1rem]">Todo List</h1>
         <button
            className="cursor-pointer bg-indigo-700 rounded-md px-[10px] py-[4px] mb-[1rem]"
            onClick={() => setShowAddTodo((prev) => !prev)}
         >
            Add Todo
         </button>

         <div className="todos border-[2px] rounded-md border-indigo-700 py-[10px]">
            {todos?.length > 0 &&
               todos.map((todo, index) => (
                  <Todo key={index} todo={todo} onChange={handelChangeStatus} />
               ))}
         </div>

         {showAddTodo && (
            <Modal>
               <ModalContent
                  className="flex items-center flex-col p-[20px]"
                  addTodo={addTodo}
                  id={todos.length}
               />
            </Modal>
         )}
      </div>
   );
};

export default Todos;
