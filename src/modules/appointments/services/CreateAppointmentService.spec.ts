import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeRepository);
  });

  it('should create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'f4k3 1d',
      user_id: 'f4k3 1d',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('f4k3 1d');
  });

  it('should not create a new appointment at a booked time', async () => {
    const now = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: now,
      provider_id: 'f4k3 1d',
      user_id: 'f4k3 1d',
    });

    await expect(
      createAppointment.execute({
        date: now,
        provider_id: 'f4k3 1d',
        user_id: 'f4k3 1d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
