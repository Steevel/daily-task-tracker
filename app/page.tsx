"use client";
// import TaskList from "@/components/TaskList";
import Task, { CompletedTask } from "@/types";
import { useEffect, useState } from "react";
import Autocomplete from "@/components/Autocomplete";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0].split("-").reverse().join("-")
  );
  const [currentTask, setCurrentTask] = useState<string>("");
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

  // ======= Inteview =========
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [date, setDate] = useState("");
  const [completedTasksDates, setCompletedTasksDates] = useState<string[]>();
  console.log("completedTasksDates", completedTasksDates);
  // ======= Inteview =========

  const data = [
    {
      name: "Monday",
      value: "Mon",
    },
    {
      name: "Tuesday",
      value: "Tue",
    },
    {
      name: "Wednesday",
      value: "Wed",
    },
    {
      name: "Thursday",
      value: "Thu",
    },
    {
      name: "Friday",
      value: "Fri",
    },
    {
      name: "Saturday",
      value: "Sat",
    },
    {
      name: "Sunday",
      value: "Sun",
    },
  ];

  const countries = [
    "India",
    "Indonesia",
    "Bangladesh",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
  ];

  const addTask = (description: string) => {
    if (selectedDays.length > 0) {
      const newTask: Task = {
        id: Date.now(),
        description,
        completed: false,
        days: selectedDays,
      };
      setTasks([...tasks, newTask]);
      // setSelectedDays([]);
    } else {
      alert("Please select at least one day for the task.");
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = todaysTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTodaysTasks(updatedTasks);
  };

  const editTaskDescription = (taskId: number, newDescription: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const calculateCompletionPercentage = () => {
    const totalTasks = todaysTasks.length;
    const completedTaskCount = todaysTasks.filter(
      (task) => task.completed
    ).length;
    return (
      totalTasks === 0 ? 0 : (completedTaskCount / totalTasks) * 100
    ).toFixed(2);
  };

  const handleButtonClick = () => {
    if (currentTask !== "") {
      addTask(currentTask);
      setCurrentTask("");
    } else {
      alert("Please add some task");
    }
  };

  const handleCheckbox = (day: string) => {
    if (selectedDays.includes(day)) {
      const filteredDays = selectedDays.filter((item) => item !== day);
      setSelectedDays(filteredDays);
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // ================ Interview ===================
  const handleCompletedTask = (id: any) => {
    if (date !== "") {
      const filterdTask = tasks.filter((task) => task.id === id);
      const compTask: CompletedTask = { task: { ...filterdTask[0] }, date };
      const newcompletedTasks: CompletedTask[] = [...completedTasks, compTask];
      setCompletedTasks(newcompletedTasks);
      setDate("");
    } else {
      alert("Select a date");
    }
  };

  const calculatePercentage = (completedTaskCount: number) => {
    const totalTasks = tasks.length;
    const completionPercentage = (
      (completedTaskCount / totalTasks) *
      100
    ).toFixed(2);

    return completionPercentage;
  };

  useEffect(() => {
    const allDates = completedTasks.map((task) => task.date);
    const unique: string[] = [];
    allDates.forEach((item) => {
      if (!unique.includes(item)) {
        unique.push(item);
      }
    });
    setCompletedTasksDates(unique);
  }, [completedTasks]);

  // ================ Interview ===================

  useEffect(() => {
    const filteredTasks = tasks.filter((task) =>
      task.days.includes(new Date().toDateString().split(" ")[0])
    );
    setTodaysTasks(filteredTasks);
  }, [tasks]);

  return (
    <div className="max-w-xl mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Daily Task Tracker
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2 text-center">Add Task</h2>
        <div className="flex flex-col  gap-2 justify-center border-2 border-slate-400 p-2 rounded-md">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter task description"
              className="border rounded py-1 px-2 flex-1"
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
          <div className="flex flex-wrap gap-2">
            {data.map((item) => (
              <span className="border-2 border-slate-500 p-0.5 rounded-md">
                <input
                  type="checkbox"
                  id={item.name}
                  onClick={() => handleCheckbox(item.value)}
                />

                <label htmlFor={item.name}>{item.name}</label>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        {/* <p className="m-2 ">
          Completion Percentage: {calculateCompletionPercentage()}%
        </p>
        <div className="">
          <h2 className="text-lg font-medium mb-2">
            Tasks for today({selectedDate})
          </h2>
          <TaskList
            tasks={todaysTasks}
            toggleTaskCompletion={toggleTaskCompletion}
            editTaskDescription={editTaskDescription}
          />
        </div> */}
        <div className="border-2 border-blue-600 p-2">
          <h2 className="text-lg font-medium mb-2">All Tasks</h2>
          {
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center border-2 border-slate-400 rounded-md p-2"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCompletedTask(task.id)}
                    className="mr-2 w-5 h-5 "
                  />
                  <div className="border-2 border-red-600">
                    <input
                      type="date"
                      name=""
                      id=""
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-400 " : ""
                    }`}
                  >
                    {task.description}
                  </span>
                </li>
              ))}
            </ul>
          }
        </div>

        {/* Completed tasks */}
        <div className="p-5">
          <h2 className="text-3xl font-bold">Completed Tasks</h2>

          {completedTasksDates?.map((currDate) => {
            const tasksForDate = completedTasks.filter(
              (item) => item.date === currDate
            );
            const completedTaskCount = tasksForDate.length;

            const completionPercentage =
              calculatePercentage(completedTaskCount);

            return (
              <div key={currDate}>
                <h3>{currDate}</h3>
                <p>Percentage: {completionPercentage}%</p>
                <ul className="space-y-2">
                  {tasksForDate.map((filteredTask) => (
                    <li
                      key={filteredTask.task.id}
                      className="flex items-center border-2 border-slate-400 rounded-md p-2"
                    >
                      <span className={`flex-1 text-slate-800`}>
                        {filteredTask.task.description}
                      </span>
                      <span>{filteredTask.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Autocomplete */}
        <Autocomplete values={countries} />
      </div>
    </div>
  );
}
