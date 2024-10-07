import { notificationService } from '@/app/services/notificationService';
import React, { useState } from 'react';


const NotificationForm = () => {
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await notificationService.sendNotification({ role, message });
            alert('Notificação enviada com sucesso!');
            setRole('');
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="text-lg font-bold">Enviar Notificação</h2>
            <div className="mb-4">
                <label className="block">Papel:</label>
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border rounded w-full p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block">Mensagem:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border rounded w-full p-2"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</button>
        </form>
    );
};

export default NotificationForm;
