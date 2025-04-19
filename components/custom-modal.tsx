import React, { ReactNode, useEffect } from "react";
import { XIcon } from "lucide-react"; // Ou outro ícone de sua escolha

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          className={`bg-white p-5 rounded-lg shadow-lg w-[600px] max-w-full relative transition-all duration-300 ease-in-out transform ${
            isOpen ? "scale-100" : "scale-95"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none transition duration-200 ease-in-out"
            onClick={onClose}
          >
            <XIcon className="w-6 h-6" />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
