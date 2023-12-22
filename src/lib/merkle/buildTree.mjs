import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { parse } from "csv-parse/sync";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

export const buildMerkleTreeFromCSV = () => {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const values = parse(
    fs.readFileSync(path.resolve(__dirname, "./list.csv"), {
      encoding: "utf8",
    }),
    {
      columns: false,
    },
  );

  const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

  fs.writeFileSync(
    path.resolve(__dirname, "tree.json"),
    JSON.stringify(tree.dump()),
  );
};

buildMerkleTreeFromCSV();
