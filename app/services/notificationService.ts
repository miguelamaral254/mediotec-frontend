import api from '../api/api';
import { SendNotificationRequest } from '../interfaces/SendNotificationRequest';
import { NotificationUpdateRequest } from '../interfaces/NotificationUpdateRequest';

export const notificationService = {
    sendNotification: async (request: SendNotificationRequest) => {
        const response = await api.post('/notifications/send', request);
        return response.data;
    },
    getNotificationsForUser: async (cpf: string) => {
        const response = await api.get('/notifications/user', { params: { cpf } });
        return response.data;
    },
    updateNotificationReadStatus: async (request: NotificationUpdateRequest) => {
        await api.post('/notifications/update', request);
    }
};