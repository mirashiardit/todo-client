import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios.get("http://localhost:3002/todos").then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Header getTasks={getTasks} />
        <TaskList tasks={tasks} getTasks={getTasks} />
      </BrowserRouter>
    </div>
  );
}

export default App;
