import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { parse } from "csv-parse/sync";
import fs from "fs";

const values = parse(
  fs.readFileSync("list.csv", { encoding: "utf8" }),
  {
    columns: false,
  }
);

const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

// (3)
console.log("Merkle Root:", tree.root);

// (4)
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

