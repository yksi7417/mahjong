const { Pattern } = require("../../../src/js/core/algorithm/pattern.js");
const { Constants } = require("../../../src/config.js");

describe("Pattern class", () => {
  test("constructs pattern with sorted keys and counts", () => {
    const pattern = new Pattern([3, 1, 1, 3, 3]);
    expect(pattern.tiles).toEqual({ "1": 2, "3": 3 });
    expect(pattern.keys).toEqual([1, 1, 3, 3, 3]);
  });

  test("copy creates a deep copy", () => {
    const original = new Pattern([1, 2, 3]);
    const copy = original.copy();
    expect(copy).not.toBe(original);
    expect(copy.tiles).toEqual(original.tiles);
    expect(copy.keys).toEqual(original.keys);
  });

  test("remove reduces tile count and updates keys", () => {
    const pattern = new Pattern([1, 1, 2]);
    pattern.remove(1);
    expect(pattern.tiles).toEqual({ "1": 1, "2": 1 });
    pattern.remove(1);
    expect(pattern.tiles).toEqual({ "2": 1 });
    expect(pattern.keys).toEqual(["2"]);
  });

  test("getSuit and matchSuit behave correctly", () => {
    const pattern = new Pattern([0]);
    expect(pattern.getSuit(8)).toBe(0);
    expect(pattern.getSuit(9)).toBe(1);
    expect(pattern.matchSuit(10, 1)).toBe(true);
    expect(pattern.matchSuit(10, 0)).toBe(false);
  });

  test("getChowInformation returns correct suit and tile info", () => {
    const pattern = new Pattern([1, 2, 3, 4, 5]);
    const info = pattern.getChowInformation(2);
    expect(info).toHaveProperty("t1");
    expect(info).toHaveProperty("t2");
    expect(info.suit).toBe(0);
  });

  test("markNeeded adds unique hash entries", () => {
    const pattern = new Pattern();
    const results = {};
    pattern.markNeeded(results, 3, Constants.PUNG);
    expect(results[3].length).toBe(1);
    pattern.markNeeded(results, 3, Constants.PUNG);
    expect(results[3].length).toBe(1); // No duplicates
  });

  test("markWin delegates to markNeeded with WIN type", () => {
    const pattern = new Pattern();
    const results = {};
    pattern.markWin(results, 7, 0);
    expect(results[7]).toBeDefined();
    expect(results[7][0]).toContain(`${Constants.WIN}`);
  });

  test("expand identifies winning hand", () => {
    const tiles = [1,1,1,2,2,2,3,3,3,4,4,4,5,5];
    const pattern = new Pattern(tiles);
    const result = pattern.expand();
    expect(result.results.win).toBeDefined();
    expect(result.results.win.length).toBeGreaterThan(0);
    expect(result.results.win[0].pair).toEqual([5]);
  });

  test("expand identifies needing one tile to win", () => {
    const tiles = [1,1,1,2,2,2,3,3,3,4,4,4,5];
    const pattern = new Pattern(tiles);
    const result = pattern.expand();
    expect(result.results[5]).toBeDefined(); // Needs one more 5 to win
  });

  test("expand handles honor tiles (non-suited) correctly", () => {
    const tiles = [31, 31, 31, 32, 32];
    const pattern = new Pattern(tiles);
    const result = pattern.expand();
    expect(result.results[32]).toBeDefined(); // Should suggest forming PUNG with 32
  });
});
