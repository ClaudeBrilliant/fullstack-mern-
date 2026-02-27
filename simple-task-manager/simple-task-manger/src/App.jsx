import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API = "http://localhost:3001/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    axios.get(API).then((res) => {
      setTasks(res.data);
    });
  }, []);

  // Add task
  const addTask = (title) => {
    const newTask = { title };

    axios.post(API, newTask).then((res) => {
      setTasks([...tasks, res.data]);
    });
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;