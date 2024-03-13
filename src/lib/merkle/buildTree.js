"use strict";
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMerkleTreeFromCSV = void 0;
var merkle_tree_1 = require("@openzeppelin/merkle-tree");
var fs_1 = __importDefault(require("fs"));
var sync_1 = require("csv-parse/sync");
var path_1 = __importDefault(require("path"));
var viem_1 = require("viem");
function buildMerkleTreeFromCSV() {
  var rawValues = (0, sync_1.parse)(
    fs_1.default.readFileSync(path_1.default.resolve(__dirname, "list.csv"), {
      encoding: "utf8",
    }),
    {
      columns: false,
    },
  );
  var values = rawValues.map(function (row) {
    var address = row[0];
    var checksummedAddress = (0, viem_1.getAddress)(address);
    return __spreadArray([checksummedAddress], __read(row.slice(1)), false);
  });
  var tree = merkle_tree_1.StandardMerkleTree.of(values, [
    "address",
    "uint256",
  ]);
  fs_1.default.writeFileSync(
    path_1.default.resolve(__dirname, "tree.json"),
    JSON.stringify(tree.dump()),
  );
  return tree;
}
exports.buildMerkleTreeFromCSV = buildMerkleTreeFromCSV;
buildMerkleTreeFromCSV();
