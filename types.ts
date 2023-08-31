interface Task {
  id: number;
  description: string;
  completed: boolean;
  days: string[];
}

export interface CompletedTask {
  task: Task;
  date: string;
}

export default Task;