import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-2  shadow-2xl">
        <div className=" text-gray-800">{children}</div>
      </div>
    </article>
  );
}
