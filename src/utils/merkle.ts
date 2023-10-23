import fs from "fs";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

let tree: StandardMerkleTree<any[]> | null = null;
let loadError: Error | null = null;

try {
  tree = StandardMerkleTree.load(
    JSON.parse(fs.readFileSync("src/merkle/tree.json", "utf8"))
  );
} catch (err) {
  loadError = err as Error;
}
export const getTree = () => {
  if (loadError) throw loadError;
  return tree;
};

export const getAllocationList = (tree: StandardMerkleTree<any[]> | null) => {
  if (!tree || loadError) throw loadError;

  const allocationObject: { [key: string]: string } = {};

  for (let [, [address, allocation]] of tree.entries()) {
    allocationObject[address] = allocation;
  }

  return allocationObject;
};

export const getProofForAddress = (
  address: string,
  tree: StandardMerkleTree<any[]> | null
) => {
  if (!tree || loadError) throw loadError;

  let proof;

  for (const [i, v] of tree.entries()) {
    if (v[0].toLowerCase() === address.toLowerCase()) {
      proof = tree.getProof(i);
      break;
    }
  }

  return proof;
};
