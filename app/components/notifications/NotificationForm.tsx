import { notificationService } from '@/app/services/notificationService';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface NotificationFormProps {
    setIsDrawerOpen: (isOpen: boolean) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ setIsDrawerOpen }) => {
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await notificationService.sendNotification({ role, message });
            Swal.fire({
                title: 'Sucesso!',
                text: 'Notificação enviada com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setRole('');
            setMessage('');
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao enviar a notificação.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div>
            <div
                id="drawer-contact"
                className="fixed top-0 right-0 z-90 h-screen p-4 overflow-y-auto transition-transform w-80 bg-[#1D1D1D]"
                tabIndex={-1}
                aria-labelledby="drawer-contact-label"
            >
                <h5
                    id="drawer-label"
                    className="flex justify-center items-center mb-12 text-base font-semibold text-white uppercase"
                >
                    Notificação
                </h5>
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Fechar menu</span>
                </button>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Receptor:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Selecione um perfil</option>
                            <option value="STUDENT">Alunos</option>
                            <option value="ADMIN">Coordenação</option>
                            <option value="PROFESSOR">Professores</option>
                            <option value="PARENT">Pais</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Mensagem:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-[#4666AF] hover:bg-blue-500 transition w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none dark:focus:ring-blue-800 block"
                    >
                        Enviar Mensagem
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NotificationForm;
