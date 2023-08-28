import Task from "@/types";
import React from "react";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (taskId: number) => void;
  editTaskDescription: (taskId: number, newDescription: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  editTaskDescription,
}) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center border-2 border-slate-400 rounded-md p-2"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
            className="mr-2 w-5 h-5 "
          />
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-400 " : ""
            }`}
          >
            {task.description}
          </span>
          <button
            onClick={() => {
              const newDescription = prompt(
                "Enter new task description",
                task.description
              );
              if (newDescription !== null) {
                editTaskDescription(task.id, newDescription);
              }
            }}
            className="ml-2 text-blue-500 hover:underline"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
