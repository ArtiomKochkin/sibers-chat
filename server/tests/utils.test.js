const { trimStr } = require("../src/utils");

describe("Utils functions", () => {
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