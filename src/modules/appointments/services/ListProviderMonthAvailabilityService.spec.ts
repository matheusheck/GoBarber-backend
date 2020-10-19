import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should list providers month availability ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 5, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'f4k3',
      date: new Date(2020, 10, 6, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 11,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 4, available: true },
        { day: 5, available: false },
        { day: 6, available: true },
        { day: 7, available: true },
      ]),
    );
  });
});
