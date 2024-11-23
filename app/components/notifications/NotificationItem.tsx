"use client";

import React, { useState } from "react";
import { Notification } from "@/app/interfaces/Notification";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import NotificationModal from "./NotificationModal";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`p-4 border rounded-lg flex items-center justify-between ${
          notification.read ? "bg-gray-100" : "bg-blue-50"
        } hover:bg-gray-200 transition cursor-pointer`}
        onClick={handleClick}
        aria-label={`Notificação: ${notification.message}`}
      >
        {/* Ícone de status */}
        <div className="flex items-center">
          <div className="mr-4 text-blue-500">
            {notification.read ? (
              <FaEnvelopeOpen size={20} />
            ) : (
              <FaEnvelope size={20} />
            )}
          </div>

          {/* Informações da notificação */}
          <div>
            <p className="font-semibold text-gray-800">
              {notification.header || "Sem título"}
            </p>
            <p className="text-sm text-gray-600">
              {notification.message || "Sem mensagem disponível."}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(notification.timestamp).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      {/* Modal para detalhes da notificação */}
      {isModalOpen && (
        <NotificationModal
          notification={notification}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationItem;