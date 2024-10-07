import { Notification } from '@/app/interfaces/Notification';
import { notificationService } from '@/app/services/notificationService';
import React, { useEffect, useState } from 'react';

const NotificationList = ({ cpf }: { cpf: string }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await notificationService.getNotificationsForUser(cpf);
                setNotifications(data);
            } catch (error) {
                console.error('Erro ao buscar notificações:', error);
            }
        };

        fetchNotifications();
    }, [cpf]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Notificações</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id} className="border-b py-2">
                        <p>{notification.message}</p>
                        <small>{new Date(notification.timestamp).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
