const { hash, unhash } = require("../../../src/js/core/algorithm/hash-printing.js");
const { Constants } = require("../../../src/config.js");

describe("hash-printing", () => {
  test("hash() creates a unique string for pair", () => {
    const result = hash({ type: Constants.PAIR, tile: 3 });
    expect(result).toBe(`${Constants.PAIR}t3`);
  });

  test("hash() with subtype for chow", () => {
    const result = hash({ type: Constants.CHOW, tile: 5, subtype: 1 });
    expect(result).toBe(`${Constants.CHOW}s1t5`);
  });

  test("unhash() restores the correct structure for pair", () => {
    const result = unhash(`${Constants.PAIR}t7`, 7);
    expect(result).toEqual({
      required: 7,
      type: Constants.PAIR,
      subtype: undefined,
      tile: 7
    });
  });

  test("unhash() restores structure for chow with subtype", () => {
    const result = unhash(`${Constants.CHOW}s2t9`, 9);
    expect(result).toEqual({
      required: 9,
      type: Constants.CHOW,
      subtype: 2,
      tile: 7 // 9 - 2
    });
  });
});
