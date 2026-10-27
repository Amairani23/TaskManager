import TaskForm from "./TaskForm/TaskForm";
import TaskList from "./TaskList/TaskList";
import Nav from "./Nav/Nav";
import ListComplete from "./ListComplete/ListComplete";
import ListPending from "./ListPending/ListPending";
import { useList } from "./hooks/useList";
import { useModal } from "./hooks/useModal";
import Modal from "./Modals/Modal/Modal";

export default function App() {
  const {
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
  } = useList();

  const [isOpenModal1, openModal1, closeModal1] = useModal(false);

  return (
    <div>
      <main className="min-h-screen bg-slate-100 p-4 sm:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Encabezado */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-2.5 text-white">✓</div>
              <h1 className="text-xl font-bold text-slate-900">Task Manager</h1>
            </div>
            <button
              type="button"
              aria-label="Notificaciones"
              className="rounded-xl bg-white p-3 text-slate-600 shadow-sm"
            >
              ♧
            </button>
          </header>

          {/* Título */}
          <section>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              {fechaBonita}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Gestor de tareas
            </h2>
            <p className="mt-1 text-slate-500">Organiza tu día, paso a paso.</p>
          </section>

          {/* Progreso visual estático */}
          <section className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-200">
            <p className="text-sm text-indigo-200">Progreso diario</p>
            <h3 className="text-2xl font-bold">{progreso}%</h3>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-indigo-400">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${progreso}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-indigo-200">
              {completadas} de {list.length} tareas completadas
            </p>
            <p className="mt-3 text-sm text-indigo-200">
              ¡Buen trabajo! Sigue así.
            </p>
          </section>

          {/* Filtros visuales */}
          <Nav setSection={setSection} section={section} />

          {/* Búsqueda decorativa */}
          {/* <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400">
            <span>⌕</span>
            <span className="text-sm">Buscar tareas...</span>
          </div> */}

          {/* Lista */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Lista de tareas
            </h3>
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
              onClick={openModal1}
            >
              + Nueva tarea
            </button>
          </div>

          {section === "inicio" && (
            <TaskList
              list={list}
              toggleComplete={toggleComplete}
              setDatatoEdit={setDatatoEdit}
              deleteData={deleteData}
              openModal1={openModal1}
            />
          )}

          {section === "pendientes" && (
            <ListPending
              list={list}
              toggleComplete={toggleComplete}
              setDatatoEdit={setDatatoEdit}
              deleteData={deleteData}
              openModal1={openModal1}
            />
          )}

          {section === "completas" && (
            <ListComplete
              list={list}
              toggleComplete={toggleComplete}
              setDatatoEdit={setDatatoEdit}
              deleteData={deleteData}
              openModal1={openModal1}
            />
          )}

          {isOpenModal1 && (
            <Modal>
              <div className=" flex items-center justify-end">
                <button
                  type="button"
                  onClick={closeModal1}
                  aria-label="Cerrar modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                >
                  &times;
                </button>
              </div>
              <TaskForm
                createData={createData}
                updateData={updateData}
                datatoEdit={datatoEdit}
                setDatatoEdit={setDatatoEdit}
                closeModal1={closeModal1}
              />
            </Modal>
          )}

          {/* Paginación decorativa */}
          {/* <footer className="flex items-center justify-between text-sm text-slate-500">
            <p>Mostrando 4 de 8 tareas</p>
            <div className="flex items-center gap-4">
              <span>‹</span>
              <span className="font-bold text-indigo-600">1</span>
              <span>2</span>
              <span>›</span>
            </div>
          </footer> */}
        </div>
      </main>
    </div>
  );
}
