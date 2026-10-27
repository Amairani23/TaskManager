import type { Task } from "../type/types";

type TaskAction =
  | { type: "ADD"; payload: Task }
  | { type: "UPDATE"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "TOGGLE"; payload: string };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "UPDATE":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, complete: !task.complete }
          : task,
      );

    default:
      return state;
  }
}
