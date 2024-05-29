import "server-only";

import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import * as Sentry from "@sentry/nextjs";
export type AllocationMap = { [key: string]: string };
import { getAddress } from "viem";
import { promises as fs } from "fs";
import path from "path";

let tree: StandardMerkleTree<any[]> | null = null;

const MerkleTreeError = new Error(
  `Error: Failed to load merkle tree. Make sure tree.json is present in the src/lib/merkle directory.`,
);

export async function getTree() {
  try {
    if (!tree) {
      const jsonFilePath = path.join(
        process.cwd() + "/src/lib/merkle/tree.json",
      );
      Sentry.captureEvent({
        message: `merkle JSON file path: ${jsonFilePath}`,
        level: "info",
      });
      const file = await fs.readFile(jsonFilePath, { encoding: "utf-8" });
      if (!file) throw MerkleTreeError;
      const treeJson = JSON.parse(file);
      if (!treeJson) throw new Error("Failed to parse tree.json");
      tree = StandardMerkleTree.load(JSON.parse(JSON.stringify(treeJson)));
      Sentry.captureEvent({
        message: `Loaded merkle tree from tree.json for the first time.`,
        level: "info",
      });
    } else {
      Sentry.captureEvent({
        message: `Returned loaded tree from memory.`,
        level: "info",
      });
      return tree;
    }
  } catch (err) {
    Sentry.captureException(err);
    return null;
  } finally {
    return tree;
  }
}

export function getAllocationList(
  tree: StandardMerkleTree<any[]> | null,
): AllocationMap {
  try {
    if (!tree) throw new Error("Tree not found");

    const allocationObject: AllocationMap = {};
    for (let [, [address, allocation]] of tree.entries()) {
      allocationObject[address] = allocation;
    }

    return allocationObject;
  } catch (err) {
    throw MerkleTreeError;
  }
}

export function getProofForAddress(
  address: string,
  tree: StandardMerkleTree<any[]> | null,
): string[] | undefined {
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
    Sentry.captureException(err);
    throw MerkleTreeError;
  }
}

export async function getAllocationForAddress(
  address: string,
): Promise<string | undefined> {
  try {
    // Get the checksummed address
    const searchAddress = getAddress(address).toLowerCase();
    const tree = await getTree();

    Sentry.captureEvent({
      message: `Getting allocation for address`,
      level: "info",
      extra: {
        address,
        checkSummedAddress: searchAddress,
      },
    });

    if (!tree) throw new Error("Tree not found");

    const allocationList = getAllocationList(tree);

    // Get the allocation for the address
    const allocation = allocationList[searchAddress];

    Sentry.captureEvent({
      message: `Got allocation for address from merkle tree`,
      level: "info",
      extra: {
        Account: searchAddress,
        Allocation: !allocation ? "0" : allocation,
      },
    });
    return allocation;
  } catch (error) {
    Sentry.captureException(error);
  }
}
