import "./App.css";
import MemorizeExample from "./components/MemorizeExample";
import Todos from "./components/Todos";

function App() {
   return (
      <div className="App flex items-center justify-center h-screen bg-black">
         <Todos />
      </div>
   );
}

export default App;
