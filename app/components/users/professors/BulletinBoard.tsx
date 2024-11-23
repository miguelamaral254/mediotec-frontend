"use client";

import React, { useEffect, useState } from "react";
import { notificationService } from "@/app/services/notificationService";
import { Notification } from "@/app/interfaces/Notification";

const BulletinBoard: React.FC<{ cpf: string | undefined }> = ({ cpf }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (cpf) {
      setLoading(true);
      setError(null);
      try {
        const data = await notificationService.getNotificationsForUser(cpf);
        const sortedNotifications = data
          .sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 3);
        setNotifications(sortedNotifications);
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setError("Erro ao carregar notificações.");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  useEffect(() => {
    fetchNotifications();
  }, [cpf]);

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
    <div className="space-y-8 mx-auto w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-center justify-between p-8 bg-white border-l-6 border-blue-500 rounded-lg shadow-xl w-full"
        >
          <h3 className="text-2xl font-bold text-blue-700">
            {notification.header || "Sem título"}
          </h3>
          <span className="text-lg text-gray-500">
            {formatDate(notification.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BulletinBoard;