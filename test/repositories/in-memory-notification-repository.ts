import { Notification } from "@application/entities/Notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { notContains } from "class-validator";

export class InMemoryNotificationsRepository implements NotificationsRepository {

    public notifications: Notification[] = [];

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async findById(notificationId: string): Promise<Notification> {
        const notification = this.notifications.find(
            (item) => item.id === notificationId
        )

        if (!notification) {
            return null;
        }

        return notification;
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            item => item.id === notification.id
        )

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
}