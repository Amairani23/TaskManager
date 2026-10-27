import { useEffect, useReducer, useState } from "react";
import { taskReducer } from "../taskReducer/taskReducer";
import type { Task } from "../type/types";

export function useList() {
  const [list, dispatch] = useReducer(taskReducer, [], (): Task[] => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
    } catch {
      return [];
    }
  });
  const [datatoEdit, setDatatoEdit] = useState<Task | null>(null);
  const [section, setSection] = useState<string>("inicio");

  const fecha = new Date();

  const dia = fecha.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fechaBonita = dia
    .replace(",", "")
    .replace(/^./, (letra) => letra.toUpperCase())
    .replace(/ de (\d{4})$/, ", $1");

  const createData = (data: Task) => {
    dispatch({
      type: "ADD",
      payload: {
        ...data,
        id: crypto.randomUUID(),
      },
    });
  };

  const updateData = (data: Task) => {
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  };

  const deleteData = (id: string) => {
    const isDelete = window.confirm("¿Estás seguro de eliminarlo?");

    if (!isDelete) return;

    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const toggleComplete = (id: string) => {
    dispatch({
      type: "TOGGLE",
      payload: id,
    });
  };

  const completadas = list.filter((task) => task.complete).length;

  const progreso =
    list.length > 0 ? Math.round((completadas / list.length) * 100) : 0;

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(list));
    } catch (error) {
      console.error("Error al guardar las tareas:", error);
    }
  }, [list]);

  return {
    list,
    datatoEdit,
    setDatatoEdit,
    section,
    setSection,
    fechaBonita,
    createData,
    updateData,
    deleteData,
    toggleComplete,
    completadas,
    progreso,
  };
}
