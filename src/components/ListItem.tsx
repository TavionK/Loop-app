import type { Task } from "../utils/tasks.ts";
import { Trash2 } from "lucide-react";
import { deleteTask, toggleTask } from "../utils/tasks.ts";
import type { Dispatch, SetStateAction } from "react";
import { supabase } from "../supabaseClient.ts";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

interface ListItemProps {
  listItem: Task;
  setTask: Dispatch<SetStateAction<Task[]>>;
}

export default function ListItem({ listItem, setTask }: ListItemProps) {
  async function handleDelete() {
    await supabase.from("tasks").delete().eq("id", listItem.id);
    setTask((prevTask: Task[]) => deleteTask(prevTask, listItem));
  }

  return (
    <li className="flex items-center gap-3 py-4 border-b border-gray-100">
      <Checkbox.Root
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await supabase
              .from("tasks")
              .update({ completed: !listItem.isComplete })
              .eq("id", listItem.id);
            setTask((prevTask: Task[]) => toggleTask(prevTask, listItem));
          }
        }}
        className="flex items-center justify-center size-5 shrink-0 rounded-full border border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-1"
        checked={listItem.isComplete}
        aria-label={`Toggle ${listItem.text} Completion`}
        id={`${listItem.id}`}
        onCheckedChange={async () => {
          await supabase
            .from("tasks")
            .update({ completed: !listItem.isComplete })
            .eq("id", listItem.id);
          setTask((prevTask: Task[]) => toggleTask(prevTask, listItem));
        }}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-white">
          <CheckIcon className="size-3" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span
        className={`flex-1 text-base ${
          listItem.isComplete ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {listItem.text}
      </span>

      <button
        aria-label={`Delete ${listItem.text}`}
        className="group rounded p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        onClick={handleDelete}
      >
        <Trash2
          strokeWidth={1.4}
          className="size-4 text-gray-300 group-hover:text-red-400 group-focus-visible:text-red-400 transition-colors duration-200"
        />
      </button>
    </li>
  );
}
