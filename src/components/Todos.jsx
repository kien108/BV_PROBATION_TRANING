import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useReducer,
   useState,
} from "react";
import Modal, { ModalContent } from "./Modal";
import Todo from "./Todo";

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
                  todos.map((todo, index) => <Todo key={index} todo={todo} />)}
            </div>

            {showAddTodo && (
               <Modal onClose={closeTodo}>
                  <ModalContent className="flex items-center flex-col p-[20px]">
                     <TodoModal id={todos.length} onClose={closeTodo} />
                  </ModalContent>
               </Modal>
            )}
         </div>
      </TodosContext.Provider>
   );
};

const TodoModal = (props) => {
   const [todo, setTodo] = useState("");
   const { dispatch } = useContext(TodosContext);

   const btnStyle =
      "rounded-md bg-indigo-800 px-4 py-[6px] font-semibold min-w-[80px]";

   const handelAddTodo = (todo) => {
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
