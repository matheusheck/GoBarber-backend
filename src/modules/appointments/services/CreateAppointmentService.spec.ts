import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should create a new appointment', async () => {
    const fakeRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'f4k3 1d',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('f4k3 1d');
  });

  it('should not create a new appointment at a booked time', async () => {
    const fakeRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeRepository);
    const now = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: now,
      provider_id: 'f4k3 1d',
    });

    await expect(
      createAppointment.execute({
        date: now,
        provider_id: 'f4k3 1d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
