import React, { useEffect, useRef, useState } from 'react';
import { Notification } from '@/app/interfaces/Notification';

interface NotificationItemProps {
    notification: Notification;
    onRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
            if (expanded && !notification.read) {
                onRead(notification.id); 
            }
            setExpanded(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [expanded, notification.read]); 

    return (
        <div 
            ref={itemRef} 
            className={`border-b p-4 hover:bg-gray-100 cursor-pointer ${notification.read ? 'text-gray-500' : 'text-black'}`}
            onClick={handleClick} 
        >
            <h2 className='font-bold'>
                De: Coordenação
            </h2>
            <h3 className="font-semibold">
                {expanded ? notification.message : 'Nova mensagem'}
            </h3>
           
        </div>
    );
};

export default NotificationItem;
