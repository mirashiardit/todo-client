import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios.get("http://localhost:3002/todos").then((response) => {
      setTasks(response.data);
    });
  };

  return (
    <div>
      <Header getTasks={getTasks} />
      <TaskList tasks={tasks} getTasks={getTasks} />
    </div>
  );
}

export default App;
