"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        rounded-lg px-5 py-3
        text-sm font-medium text-white
        shadow-lg
        ${type === "success" ? "bg-emerald-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}
