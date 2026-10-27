import TaskOne from "../TaskOne/TaskOne";
import type { Task } from "../type/types";
import type { Dispatch, SetStateAction } from "react";

type TaskListProps = {
  list: Task[];
  toggleComplete: (id: string) => void;
  deleteData: (id: string) => void;
  setDatatoEdit: Dispatch<SetStateAction<Task | null>>;
  openModal1: () => void;
};

export default function TaskList({
  list,
  setDatatoEdit,
  toggleComplete,
  deleteData,
  openModal1,
}: TaskListProps) {
  return (
    <>
      <section className="space-y-4">
        <div className="space-y-3">
          {list.map((taskO) => (
            <TaskOne
              key={taskO.id}
              taskO={taskO}
              setDatatoEdit={setDatatoEdit}
              toggleComplete={toggleComplete}
              deleteData={deleteData}
              openModal1={openModal1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
