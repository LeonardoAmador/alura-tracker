import { NotificationType } from "@/interfaces/INotifications";
import { NOTIFICATE } from "@/store/mutations-type";
import { store } from '@/store';

export const mixinNotification = {
    methods: {
        notificate(type: NotificationType, title: string, text: string): void {
            store.commit(NOTIFICATE, {
                title,
                text, 
                type
            });
        }
    }
}