export enum NotificationType {
    SUCCESS,
    FAILURE,
    ATTENTION
}

export interface INotifications {
    title: string;
    text: string;
    type: NotificationType
    id: number
}