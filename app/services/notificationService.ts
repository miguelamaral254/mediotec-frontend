import axios from 'axios';
import { SendNotificationRequest } from '../interfaces/SendNotificationRequest';
import { NotificationUpdateRequest } from '../interfaces/NotificationUpdateRequest';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const notificationService = {
    sendNotification: async (request: SendNotificationRequest) => {
        const response = await axios.post(`${API_BASE_URL}/notifications/send`, request);
        return response.data;
    },
    getNotificationsForUser: async (cpf: string) => {
        
        const response = await axios.get(`${API_BASE_URL}/notifications/user`, { params: { cpf } });
        return response.data;
    },
    updateNotificationReadStatus: async (request: NotificationUpdateRequest) => {
        
        await axios.post(`${API_BASE_URL}/notifications/update`, request);
    }
};
