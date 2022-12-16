
import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
    it('should be able to count a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRepository
        )

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2)
    });
});