import { getNowDate } from "./getNowDate";

describe("Get now Date", () => {

  beforeAll(() => {
    jest.spyOn(globalThis.Date, 'now')
      .mockImplementation(() => new Date('2023-01-01T15:25:30Z').getTime()); 
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return the correct time string", () => {
    const result = getNowDate();
    expect(result).toBe('15:25:30');
  });
});
