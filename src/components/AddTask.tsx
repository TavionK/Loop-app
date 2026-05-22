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
      className="flex justify-between items-center gap-4 mt-10"
    >
      <label htmlFor="inputBox" className="sr-only">
        Input Task
      </label>
      <input
        id="inputBox"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
        type="text"
        placeholder="Add Item..."
        className="border border-gray-400 rounded-md w-full px-4 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:border-transparent h-12"
      />
      <button
        aria-label="Add Item"
        className="bg-purple-600 p-2 text-white rounded-md cursor-pointer hover:bg-purple-700 transition-colors duration-200 ease-in-out size-12 flex items-center justify-center shrink-0 a11y-rings"
      >
        <Plus strokeWidth={2} />
      </button>
    </form>
  );
}
