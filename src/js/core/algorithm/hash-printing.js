const { Constants } = require("../../../config.js");

function hash(set) {
  let s = `${set.type}`;
  if (set.subtype) s = `${s}s${set.subtype}`;
  if (set.type === Constants.PAIR || set.type === Constants.CHOW) {
    s = `${s}t${set.tile}`;
  }
  return s;
}

function unhash(print, tile) {
  let re = /(\d+)(s(-?\d+))?(t(\d+))?/;
  let m = print.match(re);
  let type = parseInt(m[1]);
  let subtype = m[3] ? parseInt(m[3]) : undefined;
  let required = tile;
  if (type === Constants.CHOW) tile -= subtype;
  return { required, type, subtype, tile };
}

module.exports = { hash, unhash };
