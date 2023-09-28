import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

const tree = StandardMerkleTree.load(
  JSON.parse(fs.readFileSync("src/merkle/tree.json", "utf8"))
);

export const getAllocationList = () => {
  const allocationObject: { [key: string]: string } = {};

  for (let [, [address, allocation]] of tree.entries()) {
    allocationObject[address] = allocation;
  }

  return allocationObject;
};

export const getProof = (address: string) => {
  let proof;

  for (const [i, v] of tree.entries()) {
    if (v[0].toLowerCase() !== address) continue;
    proof = tree.getProof(i);
  }

  return proof;
};
