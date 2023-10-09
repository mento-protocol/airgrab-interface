import fs from "fs";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

const tree = StandardMerkleTree.load(
  JSON.parse(fs.readFileSync("src/merkle/tree.json", "utf8"))
);

export const getTree = () => {
  return tree;
};

export const getAllocationList = (tree: StandardMerkleTree<any[]>) => {
  const allocationObject: { [key: string]: string } = {};

  for (let [, [address, allocation]] of tree.entries()) {
    allocationObject[address] = allocation;
  }

  return allocationObject;
};

export const getProof = (address: string, tree: StandardMerkleTree<any[]>) => {
  let proof;

  for (const [i, v] of tree.entries()) {
    if (v[0].toLowerCase() !== address.toLowerCase()) continue;
    proof = tree.getProof(i);
  }

  return proof;
};
