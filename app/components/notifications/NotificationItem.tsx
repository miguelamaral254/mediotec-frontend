"use client";

import React, { useState } from "react";
import { Notification } from "@/app/interfaces/Notification";
import { FiMail } from "react-icons/fi";
import { TbMailOpened } from "react-icons/tb";
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 3600);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("pt-BR");
    }
  };

  return (
    <>
      <div
        className={`flex items-center border-b justify-between w-full p-4 hover:bg-gray-100 cursor-pointer ${
          notification.read ? "text-gray-500" : "text-black"
        } border border-gray-800 rounded-xl`}
        onClick={handleClick}
        aria-expanded={isModalOpen}
        aria-label={`Notificação: ${notification.message}`}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full border ${
            notification.read ? "border-gray-500" : "border-blue-500"
          } bg-white`}
        >
          {notification.read ? (
            <TbMailOpened className="text-gray-500" size={20} />
          ) : (
            <FiMail className="text-blue-500" size={20} />
          )}
        </div>
        <div className="ml-4 flex-grow">
          <h2 className="font-bold">{notification.header}</h2>
          <h3 className="font-semibold">
            {notification.read ? "Mensagem aberta" : "Nova mensagem"}
          </h3>
        </div>
        <span className="text-white p-3 bg-[#4666AF] rounded-2xl text-sm">
          {formatTimestamp(notification.timestamp)}
        </span>
      </div>
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