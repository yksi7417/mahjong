// tests/js/core/game/tileset.test.js
const { TileSet } = require("../../../src/js/core/algorithm/tileset.js");

describe("TileSet class", () => {
  test("initializes with tiles and mimics array length", () => {
    const ts = new TileSet(1, 2, 3);
    expect(ts.length).toBe(3);
    expect(ts[0]).toBe(1);
    expect(ts[2]).toBe(3);
  });

  test("concat works with arrays and TileSets", () => {
    const ts1 = new TileSet(1, 2);
    const ts2 = ts1.concat([3, 4]);
    expect(ts2 instanceof TileSet).toBe(true);
    expect(ts2.length).toBe(4);
    expect(ts2[3]).toBe(4);

    const ts3 = new TileSet(5, 6);
    const ts4 = ts1.concat(ts3);
    expect(ts4.length).toBe(4);
    expect(ts4[2]).toBe(5);
  });

  test("filter returns a new TileSet", () => {
    const ts = new TileSet(1, 2, 3, 4);
    const even = ts.filter(t => t % 2 === 0);
    expect(even instanceof TileSet).toBe(true);
    expect(even.length).toBe(2);
    expect(even[0]).toBe(2);
  });

  test("map transforms elements and returns new TileSet", () => {
    const ts = new TileSet(1, 2, 3);
    const squared = ts.map(t => t * t);
    expect(squared[0]).toBe(1);
    expect(squared[1]).toBe(4);
    expect(squared instanceof TileSet).toBe(true);
  });

  test("slice returns a subset as TileSet", () => {
    const ts = new TileSet(10, 20, 30, 40);
    const sliced = ts.slice(1, 3);
    expect(sliced.length).toBe(2);
    expect(sliced[0]).toBe(20);
    expect(sliced[1]).toBe(30);
  });

  test("push adds an element", () => {
    const ts = new TileSet(1, 2);
    ts.push(3);
    expect(ts.length).toBe(3);
    expect(ts[2]).toBe(3);
  });

  test("forEach and some behave like array", () => {
    const ts = new TileSet(2, 4, 6);
    let sum = 0;
    ts.forEach(n => sum += n);
    expect(sum).toBe(12);

    const hasEven = ts.some(n => n % 2 === 0);
    expect(hasEven).toBe(true);

    const allEven = ts.every(n => n % 2 === 0);
    expect(allEven).toBe(true);
  });

  test("sort modifies internal array", () => {
    const ts = new TileSet(3, 1, 2);
    ts.sort((a, b) => a - b);
    expect(ts[0]).toBe(1);
    expect(ts[1]).toBe(2);
    expect(ts[2]).toBe(3);
  });

  test("toString and valueOf behave like array", () => {
    const ts = new TileSet(5, 10, 15);
    expect(ts.toString()).toBe("5,10,15");
    expect(ts.valueOf()).toEqual([5, 10, 15]);
  });
});
