"use client";
import TaskList from "@/components/TaskList";
import Task from "@/types";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0].split("-").reverse().join("-")
  );
  const [currentTask, setCurrentTask] = useState<string>("");

  const addTask = (description: string) => {
    const newTask: Task = {
      id: Date.now(),
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTaskDescription = (taskId: number, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const calculateCompletionPercentage = () => {
    const totalTasks = tasks.length;
    const completedTaskCount = tasks.filter((task) => task.completed).length;
    return totalTasks === 0 ? 0 : (completedTaskCount / totalTasks) * 100;
  };

  const handleButtonClick = () => {
    if (currentTask !== "") {
      addTask(currentTask);
      setCurrentTask("");
    } else {
      alert("Please add some task");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Daily Task Tracker
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2 text-center">Add Task</h2>
        <div className="flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Enter task description"
            className="border rounded py-1 px-2 "
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-md"
            onClick={() => handleButtonClick()}
          >
            Add <span className="hidden md:inline">Task</span>
          </button>
        </div>
      </div>
      <div>
        <p className="m-2 ">
          Completion Percentage: {calculateCompletionPercentage()}%
        </p>
        <h2 className="text-lg font-medium mb-2">Tasks for {selectedDate}</h2>
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          editTaskDescription={editTaskDescription}
        />
      </div>
    </div>
  );
}
