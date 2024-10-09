"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Notification } from '@/app/interfaces/Notification';
import { FiMail } from 'react-icons/fi'; 
import { TbMailOpened } from 'react-icons/tb'; // Importando TbMailOpened

interface NotificationItemProps {
    notification: Notification;
    onRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!notification.read) {
            onRead(notification.id);
        }
        setExpanded(!expanded);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 3600);

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    };

    return (
        <div 
            ref={itemRef} 
            className={`flex items-center border-b gap-2 p-4 hover:bg-gray-100 cursor-pointer ${notification.read ? 'text-gray-500' : 'text-black'} border border-gray-800 rounded-xl`}
            onClick={handleClick} 
            aria-expanded={expanded}
            aria-label={`Notificação de Coordenação: ${notification.message}`}
        >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border ${notification.read ? 'border-gray-500' : 'border-blue-500'} bg-white`}>
                {notification.read ? <TbMailOpened className="text-gray-500" size={20} /> : <FiMail className="text-blue-500" size={20} />}
            </div>
            <div className="ml-4">
                <h2 className='font-bold'>De: Coordenação</h2>
                <h3 className="font-semibold">{expanded ? notification.message : (notification.read ? 'Mensagem aberta' : 'Nova mensagem')}</h3>
            </div>
            <span className="text-white p-3 bg-blue-400 rounded-2xl text-sm">
                {formatTimestamp(notification.timestamp)}
            </span>
        </div>
    );
};

export default NotificationItem;
