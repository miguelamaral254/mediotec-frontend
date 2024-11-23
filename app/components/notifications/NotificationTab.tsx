import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { notificationService } from '@/app/services/notificationService';
import { Notification } from '@/app/interfaces/Notification';
import { FaTimes } from 'react-icons/fa';
import NotificationItem from './NotificationItem';

const NotificationTab: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  setUnreadCount: (count: number) => void;
}> = ({ isOpen, onClose, setUnreadCount }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (user?.cpf) {
      setLoading(true);
      setError(null);
      try {
        const data = await notificationService.getNotificationsForUser(user.cpf);
        const sortedNotifications = data.sort(
          (a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setNotifications(sortedNotifications);
        const unreadCount = sortedNotifications.filter((n: { read: unknown; }) => !n.read).length;
        setUnreadCount(unreadCount);
      } catch (err) {
        console.log(err)
        setError('Erro ao buscar notificações.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReadNotification = async (id: number) => {
    try {
      await notificationService.updateNotificationReadStatus({ id, read: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      const unreadCount = notifications.filter((n) => n.id !== id && !n.read).length;
      setUnreadCount(unreadCount);
    } catch (err) {
      console.error('Erro ao atualizar status de notificação:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <div
      className={`fixed top-0 right-0 bg-white shadow-lg transition-transform duration-500 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{
        width: '400px',
        height: '100vh',
        maxWidth: '90vw',
        overflowY: 'auto',
      }}
    >
      <div className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <h2 className="text-lg font-bold">Notificações</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition"
        >
          <FaTimes size={20} />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Carregando notificações...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Nenhuma notificação.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationTab;