import type { Task } from "../type/types";
import { Pencil, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type TaskProps = {
  taskO: Task;
  toggleComplete: (id: string) => void;
  deleteData: (id: string) => void;
  setDatatoEdit: Dispatch<SetStateAction<Task | null>>;
  openModal1: () => void;
};

const priorityStyles = {
  alta: "bg-red-100 text-red-700",
  media: "bg-amber-100 text-amber-700",
  baja: "bg-green-100 text-green-700",
};

export default function TaskOne({
  taskO,
  setDatatoEdit,
  toggleComplete,
  deleteData,
  openModal1,
}: TaskProps) {
  return (
    <article
      key={taskO.id}
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm"
    >
      {/* Checkbox solamente visual */}
      <button
        onClick={() => toggleComplete(taskO.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
          taskO.complete
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-slate-300"
        }`}
      >
        {taskO.complete && "✓"}
      </button>

      <div className="min-w-0 flex-1">
        <h4
          className={`font-semibold ${
            taskO.complete ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {taskO.title}
        </h4>
        <span
          className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-semibold ${
            priorityStyles[taskO.priority]
          }`}
        >
          {taskO.priority}
        </span>
      </div>

      {/* Botones Editar y Borrar */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setDatatoEdit(taskO);
            openModal1();
          }}
          className="flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50"
        >
          <Pencil size={16} />
          Editar
        </button>

        <button
          type="button"
          onClick={() => deleteData(taskO.id)}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Borrar
        </button>
      </div>
    </article>
  );
}
