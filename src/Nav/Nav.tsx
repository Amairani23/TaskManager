type NavProps = {
  section: string;
  setSection: React.Dispatch<React.SetStateAction<string>>;
};

export default function Nav({ setSection, section }: NavProps) {
  const handleSection = (section: string) => {
    setSection(section);
  };

  return (
    <nav className="flex gap-2 overflow-x-auto rounded-xl bg-white p-2 shadow-sm">
      <button
        type="button"
        onClick={() => handleSection("inicio")}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
          section === "inicio"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        Todas
      </button>

      <button
        type="button"
        onClick={() => handleSection("pendientes")}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
          section === "pendientes"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        Pendientes
      </button>

      <button
        type="button"
        onClick={() => handleSection("completas")}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
          section === "completas"
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        Completadas
      </button>
    </nav>
  );
}
