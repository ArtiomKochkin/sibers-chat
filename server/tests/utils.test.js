const { trimStr, getNowDate } = require("../src/utils");

describe("Trim string", () => {
  it("Should trim a string", () => {
    expect(trimStr(" Artyom     ")).toBe("artyom");
  });

  it("Should trim a empty string", () => {
    expect(trimStr("  ")).toBe("");
  });

  it("Should trim a long string", () => {
    let str = "LoREm ipsuM doloR sit amet, conSecteTuR adiPIscinG Elit.  "
    expect(trimStr(str)).toBe("lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });
});


describe("Get now date", () => {
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