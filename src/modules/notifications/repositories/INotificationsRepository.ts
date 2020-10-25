import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
