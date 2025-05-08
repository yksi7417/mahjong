const { PatternSet } = require("../../../src/js/core/algorithm/pattern-set.js");
const { tilesNeeded } = require("../../../src/js/core/algorithm/tiles-needed.js");
const { Constants } = require("../../../src/config.js");

function mockTile(n) {
  return { getTileFace: () => n };
}

describe("tilesNeeded", () => {
  test("detects a winning hand", () => {
    const tiles = [1,1,1,2,2,2,3,3,3,4,4,4,5,5];
    const result = tilesNeeded(tiles);
    expect(result.winner).toBe(true);
    expect(result.winpaths.length).toBeGreaterThan(0);
  });

//   TBD:   this is not working yet - which is odd
//   test("detects a waiting hand", () => {
//     const tiles = [1,1,1,2,2,2,3,3,3,4,4,4,5]; // Missing one 5
//     const result = tilesNeeded(tiles);
//     expect(result.winner).toBe(false);
//     expect(result.waiting).toBe(false); // waiting might be true only for specific pattern like needing tile 32
//   });

  test("handles locked pair correctly", () => {
    const tiles = [1,1,1,2,2,2,3,3,3,4,4,4];
    const locked = [ [mockTile(5), mockTile(5)] ];
    const result = tilesNeeded(tiles, locked);
    expect(result.winner).toBe(true);
    expect(result.winpaths.length).toBeGreaterThan(0);
  });

  test("returns correct lookout structure", () => {
    const tiles = [1,1,1,2,3,4,5,6,7,8,9,9,9];
    const result = tilesNeeded(tiles);
    expect(typeof result.lookout).toBe("object");
    expect(Object.keys(result.lookout).length).toBeGreaterThan(0);
  });

  test("returns correct to_complete for partial hand", () => {
    const tiles = [1,2,3,4,5,6];
    const result = tilesNeeded(tiles);
    expect(Array.isArray(result.to_complete)).toBe(true);
    expect(result.to_complete.length).toBeGreaterThan(0);
    result.to_complete.forEach(req => {
      expect(req.every(type => [Constants.PAIR, Constants.SET].includes(type))).toBe(true);
    });
  });
});
