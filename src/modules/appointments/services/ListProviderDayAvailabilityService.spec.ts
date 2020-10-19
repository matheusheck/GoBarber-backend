import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should list providers month availability ', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 5, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      day: 5,
      year: 2020,
      month: 11,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
