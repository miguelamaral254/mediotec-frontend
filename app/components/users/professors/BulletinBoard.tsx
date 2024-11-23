"use client";

import React, { useEffect, useState, useCallback } from "react";
import { notificationService } from "@/app/services/notificationService";
import { Notification } from "@/app/interfaces/Notification";

const BulletinBoard: React.FC<{ cpf: string | undefined }> = ({ cpf }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (cpf) {
      setLoading(true);
      setError(null);
      try {
        const data = await notificationService.getNotificationsForUser(cpf);
        const sortedNotifications = data
          .sort(
            (a: { timestamp: string | number | Date }, b: { timestamp: string | number | Date }) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .slice(0, 3);
        setNotifications(sortedNotifications);
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setError("Erro ao carregar notificações.");
      } finally {
        setLoading(false);
      }
    }
  }, [cpf]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  if (loading) {
    return <p className="text-gray-600">Carregando avisos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (notifications.length === 0) {
    return <p className="text-gray-600">Nenhum aviso disponível no momento.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow-md border border-gray-300">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className="flex flex-col sm:flex-row items-start sm:items-center p-4 hover:bg-gray-50 space-y-2 sm:space-y-0 sm:space-x-4"
        >
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-800 truncate">
              {notification.header || "Sem título"}
            </h3>
            <p className="text-gray-600 text-sm mt-1 truncate">
              {notification.message || "Sem detalhes disponíveis."}
            </p>
          </div>
          <div className="text-sm text-gray-500 whitespace-nowrap">
            {formatDate(notification.timestamp)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BulletinBoard;