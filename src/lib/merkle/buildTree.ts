// @ts-nocheck
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import url from "url";
import { getAddress } from "viem";

export function buildMerkleTreeFromCSV() {
  const dirNamr = path.dirname(url.fileURLToPath(import.meta.url));
  const rawValues = parse(
    fs.readFileSync(path.resolve(__dirname, "./list.csv"), {
      encoding: "utf8",
    }),
    {
      columns: false,
    },
  );

  const values = rawValues.map((row: string | any[]) => {
    const address = row[0];
    const checksummedAddress = getAddress(address);
    return [checksummedAddress, ...row.slice(1)];
  });

  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

  fs.writeFileSync(
    path.resolve(__dirname, "tree.json"),
    JSON.stringify(tree.dump()),
  );

  return tree;
}

buildMerkleTreeFromCSV();
