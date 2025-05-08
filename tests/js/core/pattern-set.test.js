const { PatternSet } = require("../../../src/js/core/algorithm/pattern-set");

describe("PatternSet", () => {
  test("should create a PatternSet from hash", () => {
    const mockUnhash = jest.fn().mockReturnValue("mockContent");
    global.unhash = mockUnhash;

    const patternSet = PatternSet.from("mockHash");

    expect(mockUnhash).toHaveBeenCalledWith("mockHash");
    expect(patternSet.content).toBe("mockContent");
  });

  test("should create a PatternSet from tiles", () => {
    const mockTile = { getTileFace: jest.fn().mockReturnValue(1) };
    const tiles = [mockTile, mockTile, mockTile];

    const patternSet = PatternSet.fromTiles(tiles, true, false);

    expect(mockTile.getTileFace).toHaveBeenCalledTimes(3);
    expect(patternSet.type).toBe("pung");
    expect(patternSet.tilenumber).toBe(1);
    expect(patternSet.locked).toBe(true);
    expect(patternSet.concealed).toBe(false);
  });

  test("should return correct SetID", () => {
    const patternSet = new PatternSet("kong", 5, true, false);
    expect(patternSet.getSetID()).toBe("4k-5-!");
  });

  test("should return correct tiles array", () => {
    const patternSet = new PatternSet("chow", 3, false, false);
    expect(patternSet.tiles()).toEqual([3, 4, 5]);
  });

  test("should return correct size", () => {
    const patternSet = new PatternSet("pair", 7, false, false);
    expect(patternSet.size()).toBe(2);
  });

  test("should correctly compare equality", () => {
    const patternSet1 = new PatternSet("single", 9, false, false);
    const patternSet2 = new PatternSet("single", 9, false, false);
    const patternSet3 = new PatternSet("pair", 9, false, false);

    expect(patternSet1.equals(patternSet2)).toBe(true);
    expect(patternSet1.equals(patternSet3)).toBe(false);
  });

  test("should correctly handle string parity methods", () => {
    const patternSet = new PatternSet("pung", 2, false, false);

    expect(patternSet.toString()).toBe("3p-2-");
    expect(patternSet.split("-")).toEqual(["3p", "2", ""]);
    expect(patternSet.indexOf("p")).toBe(1);
    expect(patternSet.valueOf()).toBe("3p-2-");
  });
});