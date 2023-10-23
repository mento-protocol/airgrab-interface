import fs from "fs";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

let tree: StandardMerkleTree<any[]> | null = null;

function loadTree() {
  if (!tree) {
    try {
      tree = StandardMerkleTree.load(
        JSON.parse(fs.readFileSync("src/merkle/tree.json", "utf8"))
      );
    } catch (err) {
      throw new Error(
        `Error loading tree: ${
          (err as Error).message
        }. Make sure tree.json is present in the src/merkle directory.'`
      );
    }
  } else {
    return tree;
  }
}

function initialize() {
  loadTree();
}

export const getTree = (): StandardMerkleTree<any[]> | null => {
  return tree;
};

export type AllocationMap = { [key: string]: string };

export const getAllocationList = (
  tree: StandardMerkleTree<any[]> | null
): AllocationMap => {
  try {
    if (!tree) throw new Error("Tree not found");

    const allocationObject: AllocationMap = {};
    for (let [, [address, allocation]] of tree.entries()) {
      allocationObject[address] = allocation;
    }

    return allocationObject;
  } catch (err) {
    throw new Error(
      `Error: merkle tree not found ${
        (err as Error).message
      }. Make sure tree.json is present in the src/merkle directory.'`
    );
  }
};

export const getProofForAddress = (
  address: string,
  tree: StandardMerkleTree<any[]> | null
): string[] | undefined => {
  if (!tree) throw new Error("Tree not found");
  try {
    let proof;
    for (const [i, v] of tree.entries()) {
      if (v[0].toLowerCase() === address.toLowerCase()) {
        proof = tree.getProof(i);
        break;
      }
    }
    return proof;
  } catch (err) {
    throw new Error(
      `Error: merkle tree not found  ${
        (err as Error).message
      }. Make sure tree.json is present in the src/merkle directory.'`
    );
  }
};

initialize();
