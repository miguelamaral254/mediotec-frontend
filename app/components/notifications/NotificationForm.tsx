import { notificationService } from '@/app/services/notificationService';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface NotificationFormProps {
    setIsDrawerOpen: (isOpen: boolean) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ setIsDrawerOpen }) => {
    const [roles, setRoles] = useState<{ [key: string]: boolean }>({
        STUDENT: false,
        ADMIN: false,
        PROFESSOR: false,
        PARENT: false,
    });
    const [message, setMessage] = useState('');
    const [header, setHeader] = useState('');

    const handleCheckboxChange = (role: string) => {
        setRoles((prev) => ({
            ...prev,
            [role]: !prev[role],
        }));
    };

    const handleSelectAll = (isChecked: boolean) => {
        setRoles({
            STUDENT: isChecked,
            ADMIN: isChecked,
            PROFESSOR: isChecked,
            PARENT: isChecked,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedRoles = Object.keys(roles).filter((role) => roles[role]);

        if (selectedRoles.length === 0) {
            Swal.fire({
                title: 'Erro!',
                text: 'Por favor, selecione pelo menos um receptor.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            return;
        }

        const notificationRequests = selectedRoles.map((role) => ({
            role,
            message,
            header,
        }));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loadingSwal = Swal.fire({
            title: 'Carregando...',
            text: 'Enviando notificações...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            for (const request of notificationRequests) {
                await notificationService.sendNotification(request);
            }

            Swal.close();

            Swal.fire({
                title: 'Sucesso!',
                text: 'Notificação enviada com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
            setRoles({
                STUDENT: false,
                ADMIN: false,
                PROFESSOR: false,
                PARENT: false,
            });
            setMessage('');
            setHeader('');
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
            Swal.close();
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao enviar a notificação.',
                icon: 'error',
                confirmButtonText: 'Ok',
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
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Cabeçalho:</label>
                        <input
                            type="text"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enviar para:</label>
                        <div className="flex flex-col">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="select-all" className="ml-2 rounded text-sm text-gray-900 dark:text-white">
                                    Todos
                                </label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="STUDENT"
                                    checked={roles.STUDENT}
                                    onChange={() => handleCheckboxChange('STUDENT')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    value="STUDENT"
                                />
                                <label htmlFor="STUDENT" className="ml-2 text-sm text-gray-900 dark:text-white">
                                    Alunos
                                </label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="ADMIN"
                                    checked={roles.ADMIN}
                                    onChange={() => handleCheckboxChange('ADMIN')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    value="ADMIN"
                                />
                                <label htmlFor="ADMIN" className="ml-2 text-sm text-gray-900 dark:text-white">
                                    Coordenação
                                </label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="PROFESSOR"
                                    checked={roles.PROFESSOR}
                                    onChange={() => handleCheckboxChange('PROFESSOR')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    value="PROFESSOR"
                                />
                                <label htmlFor="PROFESSOR" className="ml-2 text-sm text-gray-900 dark:text-white">
                                    Professores
                                </label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="PARENT"
                                    checked={roles.PARENT}
                                    onChange={() => handleCheckboxChange('PARENT')}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    value="PARENT"
                                />
                                <label htmlFor="PARENT" className="ml-2 text-sm text-gray-900 dark:text-white">
                                    Pais
                                </label>
                            </div>
                        </div>
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
