"use client";

import React from "react";
import ReactDOM from "react-dom";
import { Notification } from "@/app/interfaces/Notification";
import { FaTimes } from "react-icons/fa";

interface NotificationModalProps {
  notification: Notification;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notification,
  onClose,
}) => {
  const modalContent = (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center">
      <div className="bg-white w-full max-w-5xl mt-16 rounded-lg shadow-lg relative flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{notification.header}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            <strong>Coordenação@Mediotec</strong>{" "} <span>&lt;Coordenacao@edu.pe.mediotec.br&gt;</span>
            <p>Para mim:</p>
            </p>
           
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          <p className="text-gray-800 text-base leading-relaxed">
            {notification.message}
          </p>
        </div>

        <div className="bg-gray-50 border-t p-4 text-sm text-gray-600 space-y-2">
          <p>
            <strong>Data:</strong>{" "}
            {new Date(notification.timestamp).toLocaleString("pt-BR")}
          </p>
          <p>
            <strong>Status:</strong> {notification.read ? "Lida" : "Não lida"}
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default NotificationModal;