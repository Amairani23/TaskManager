export type Task = {
  id: string;
  title: string;
  complete: boolean;
  priority: "baja" | "media" | "alta";
};
