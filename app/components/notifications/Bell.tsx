import { Notification } from '@/app/interfaces/Notification';
import { notificationService } from '@/app/services/notificationService';
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem'; // Importing the NotificationItem component

interface NotificationBellProps {
    userCpf: string;
    isNavbarOpen: boolean; // Added to handle dropdown visibility
}

const NotificationBell: React.FC<NotificationBellProps> = ({ userCpf, isNavbarOpen }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const data = await notificationService.getNotificationsForUser(userCpf);
            console.log('Notificações recebidas:', data);
            setNotifications(data);
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await notificationService.updateNotificationReadStatus({ id, read: true });
            setNotifications((prev) => prev.map(notification => 
                notification.id === id ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error('Erro ao marcar notificação como lida:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userCpf]);

    useEffect(() => {
        // Close dropdown when navbar closes
        if (!isNavbarOpen) {
            setDropdownOpen(false);
        }
    }, [isNavbarOpen]);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const unreadNotifications = notifications.filter(notification => !notification.read);
    const unreadCount = unreadNotifications.length;

    return (
        <div className="relative">
            <button onClick={handleDropdownToggle} className="text-gray-100 relative">
                <FaBell className="text-xl" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                )}
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 top-8 transform bg-white border text-black border-gray-300 rounded shadow-lg w-64 z-10">
                    {notifications.length === 0 ? (
                        <p className="p-4 text-gray-600">Nenhuma notificação.</p>
                    ) : (
                        unreadCount === 0 ? (
                            <p className="p-4 text-gray-600">Nenhuma notificação nova.</p>
                        ) : (
                            unreadNotifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={markAsRead}
                                />
                            ))
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
