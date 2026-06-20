import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  getTasks,
  updateTask,
  deleteTask
} from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ COMPLETE TASK
  const handleComplete = async (id) => {
    try {
      await updateTask(id, { completed: true });
      fetchTasks();
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  // ✅ DELETE TASK
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <aside className="hidden md:block w-64 bg-gray-100 p-4 min-h-screen">
        <h2 className="font-bold text-lg mb-4">Menu</h2>

        <ul className="space-y-2 text-sm">
          <li>Dashboard</li>
          <li>Tasks</li>
          <li>Completed</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4">

        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

        {/* FLEX: FORM + INFO */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">

          <TaskForm onTaskAdded={fetchTasks} />

          <div className="bg-white p-4 rounded border flex-1">
            <h3 className="font-semibold">Task Overview</h3>
            <p className="text-sm text-gray-500">
              Manage your tasks efficiently 🚀
            </p>
          </div>

        </div>

        {/* GRID: TASK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}

        </div>

      </div>
    </div>
  );
}