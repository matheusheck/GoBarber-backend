import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 10, 13),
      provider_id: 'f4k3 1d',
      user_id: 'f4k3',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('f4k3 1d');
  });

  it('should not create a new appointment at a booked time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 10).getTime();
    });

    const date = new Date(2020, 5, 10, 13);

    await createAppointment.execute({
      date,
      provider_id: 'f4k3 1d',
      user_id: 'f4k3',
    });

    await expect(
      createAppointment.execute({
        date,
        provider_id: 'f4k3 1d',
        user_id: 'f4k3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 12),
        provider_id: 'f4k3 1d',
        user_id: 'f4k3',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to book appointment with same user and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 13),
        provider_id: 'f4k3 1d',
        user_id: 'f4k3 1d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to book appointment out working hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        provider_id: 'f4k3 1d',
        user_id: 'f4k3',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        provider_id: 'f4k3 1d',
        user_id: 'f4ke',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
