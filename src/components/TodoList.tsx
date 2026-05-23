import type { Task } from "../utils/tasks.ts";
import ListItem from "./ListItem.tsx";
import type { Dispatch, SetStateAction } from "react";
import { clearAllTasks } from "../utils/tasks.ts";
import { supabase } from "../supabaseClient.ts";

interface TodoListProps {
  tasks: Task[];
  setTask: Dispatch<SetStateAction<Task[]>>;
}

export default function TodoList({ tasks, setTask }: TodoListProps) {
  async function handleClearAll() {
    const ids = tasks.map((t) => t.id);
    if (ids.length) await supabase.from("tasks").delete().in("id", ids);
    setTask(clearAllTasks);
  }

  return (
    <section aria-label="Todo List">
      <div className="flex items-center justify-between mb-3">
        <span
          aria-live="polite"
          className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Tasks · {tasks.length}
        </span>
        <button
          onClick={handleClearAll}
          className="text-xs font-semibold text-purple-600 uppercase tracking-wider cursor-pointer hover:text-purple-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 rounded"
        >
          Clear all
        </button>
      </div>

      <ul className="border-t border-gray-100">
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-12">
            No tasks yet — add one below.
          </p>
        ) : (
          tasks.map((task: Task) => (
            <ListItem key={task.id} listItem={task} setTask={setTask} />
          ))
        )}
      </ul>

    </section>
  );
}
