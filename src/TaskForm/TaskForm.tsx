import React, { useEffect, useState } from "react";
import type { Task } from "../type/types";
import type { Dispatch, SetStateAction } from "react";

type TaskFormProps = {
  //función que recibe una tarea (Task) y no devuelve ningún valor que necesites utilizar
  createData: (data: Task) => void;
  updateData: (data: Task) => void;
  //puede contener una tarea o null.
  datatoEdit: Task | null;
  closeModal1: () => void;
  //es la función que React proporciona para cambiar el estado datatoEdit
  setDatatoEdit: Dispatch<SetStateAction<Task | null>>;
};

const inicielForm: Task = {
  id: "",
  title: "",
  complete: false,
  priority: "baja",
};

export default function TaskForm({
  createData,
  updateData,
  datatoEdit,
  setDatatoEdit,
  closeModal1,
}: TaskFormProps) {
  const [form, setForm] = useState<Task>(inicielForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title) {
      return console.log("datos incompletos");
    }

    if (form.id === "") {
      createData({ ...form, id: crypto.randomUUID() });
    } else {
      updateData(form);
    }

    handleReset();
    closeModal1();
  };

  const handleReset = () => {
    setForm(inicielForm);
    setDatatoEdit(null);
  };

  useEffect(() => {
    if (datatoEdit) {
      setForm(datatoEdit);
    } else {
      setForm(inicielForm);
    }
  }, [datatoEdit]);

  return (
    <div className="space-y-5 rounded-2xl bg-white p-6 ">
      <h3 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
        {datatoEdit ? "Editar tarea" : "Agregar tarea"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-slate-700"
          >
            Título de la tarea
          </label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Ej. Terminar proyecto"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="priority"
            className="block text-sm font-semibold text-slate-700"
          >
            Prioridad
          </label>

          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="baja">🟢 Baja</option>
            <option value="media">🟡 Media</option>
            <option value="alta">🔴 Alta</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          {datatoEdit ? "Guardar cambios" : "Crear tarea"}
        </button>
      </form>
    </div>
  );
}
