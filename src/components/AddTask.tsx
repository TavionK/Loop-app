import { Plus } from "lucide-react";
import { type Task, addTask } from "../utils/tasks.ts";
import {
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import { supabase } from "../supabaseClient.ts";

interface AddTaskProps {
  setTask: Dispatch<SetStateAction<Task[]>>;
  userId: string;
}

export default function AddTask({ setTask, userId }: AddTaskProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = async (
    e,
  ) => {
    e.preventDefault();
    const title = inputValue.trim();
    if (!title) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ user_id: userId, title })
      .select("id")
      .single();

    if (error || !data) return;

    const newTask: Task = { id: data.id, text: title, isComplete: false };
    setTask((prev) => addTask(prev, newTask));
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 shadow-lg"
    >
      <label htmlFor="inputBox" className="sr-only">
        Add a task
      </label>
      <input
        id="inputBox"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
        type="text"
        placeholder="Add a task..."
        className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none"
      />
      <button
        aria-label="Add Item"
        className="bg-purple-600 text-white rounded-full size-8 flex items-center justify-center shrink-0 hover:bg-purple-700 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
      >
        <Plus strokeWidth={2.2} size={15} />
      </button>
    </form>
  );
}
