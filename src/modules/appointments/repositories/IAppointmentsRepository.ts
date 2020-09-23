import Appointment from '@modules/appointments/infra/typeorm/entity/Appointment';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
