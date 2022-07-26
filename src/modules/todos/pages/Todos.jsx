import React, { createContext, useCallback, useReducer, useState } from "react";
import { Modal, ModalContent } from "../../../components";
import { Todo, TodoModal } from "../components";
import { TodoContainer } from "../containers";

const todoReducer = (state, action) => {
   switch (action.type) {
      case "add":
         console.log(action.payload);
         return [...state, action.payload.todo];

      case "done":
         const newState = [
            ...state.map((item) =>
               item.id === action.payload.id
                  ? { ...item, progress: !item.progress }
                  : item
            ),
         ];

         return newState;
      default:
         return state;
   }
};

export const TodosContext = createContext();

const Todos = () => {
   const [todos, dispatch] = useReducer(todoReducer, [
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

   const closeTodo = useCallback(() => {
      setShowAddTodo(false);
   }, [showAddTodo]);

   return (
      <TodosContext.Provider value={{ todos, dispatch }}>
         <TodoContainer className="bg-indigo-500 w-[500px] text-white px-[15px] py-[20px] rounded-lg shadow-lg">
            <h1 className="font-bold text-2xl mb-[1rem]">Todo List</h1>
            <button
               className="cursor-pointer bg-indigo-700 rounded-lg px-[12px] py-[6px] mb-[1rem]"
               onClick={() => setShowAddTodo((prev) => !prev)}
            >
               Add Todo
            </button>

            <div className="todos border-[2px] rounded-md border-indigo-700 py-[30px]">
               {todos?.length > 0 &&
                  todos.map((todo, index) => <Todo key={index} todo={todo} />)}
            </div>

            {showAddTodo && (
               <Modal onClose={closeTodo}>
                  <ModalContent className="flex items-center flex-col p-[20px]">
                     <TodoModal id={todos.length} onClose={closeTodo} />
                  </ModalContent>
               </Modal>
            )}
         </TodoContainer>
      </TodosContext.Provider>
   );
};

export default Todos;
