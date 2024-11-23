
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import NotificationItem from './NotificationItem';
import { notificationService } from '@/app/services/notificationService';
import { Notification } from '@/app/interfaces/Notification';
import { FaTimes } from 'react-icons/fa';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
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
      className={`fixed top-0 right-0 bg-white shadow-lg border-l border-gray-300 transition-transform duration-700 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } z-50`}
      style={{
        width: '320px',
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <div className="flex justify-between items-center p-4 bg-gray-200 border-b">
        <h2 className="text-xl font-bold text-gray-700">Notificações</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition"
        >
          <FaTimes size={20} />
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500 mt-4 text-center">Carregando notificações...</p>
      ) : error ? (
        <p className="text-red-500 mt-4 text-center">{error}</p>
      ) : (
        <div className="p-4">
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