import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import NotificationItem from './NotificationItem';
import { notificationService } from '@/app/services/notificationService';
import { Notification } from '@/app/interfaces/Notification';

const NotificationTab: React.FC = () => {
  const { user } = useAuth(); // Assuming you can access user directly from useAuth
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (user && user.cpf) {
      setLoading(true);
      setError(null);
      try {
        const data = await notificationService.getNotificationsForUser(user.cpf);
        console.log('Fetched notifications:', data); // Debugging line

        // Ordenando as notificações da mais nova para a mais velha
        const sortedNotifications = data.sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setNotifications(sortedNotifications);
      } catch (err) {
        setError('Erro ao buscar notificações.');
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReadNotification = async (id: number) => {
    try {
      await notificationService.updateNotificationReadStatus({ id, read: true });
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de notificação:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Fetch notifications when the user changes

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-2xl font-semibold">Notificações</h2>
      {loading ? (
        <p className="text-gray-600">Carregando notificações...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
              />
            ))
          ) : (
            <p className="text-gray-600">Nenhuma notificação.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationTab;
