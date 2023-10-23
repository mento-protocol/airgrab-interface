import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getAllocationList, getProof } from "@/utils/merkle.ts";
import { parse } from "csv-parse/sync";
import { TextEncoder } from "util";

const csvData = parse(
  new TextEncoder()
    .encode(`0xA838E871A02C6d883bF004352Fc7dAc8f781FEd6,100000000000000000000
0x6efD5DBb3E3C96C4c8bc7376AAe263D1C0e7F532,100000000000000000000
0x70f2Db6D22593a65Dbb848C94eBACDF0344642F7,100000000000000000000`)
);

let tree;

beforeAll(() => {
  tree = StandardMerkleTree.of(csvData, ["address", "uint256"]);
});

describe("getAllocationList", () => {
  test("should return correct allocation object", () => {
    const allocations = getAllocationList(tree);
    expect(allocations["0xA838E871A02C6d883bF004352Fc7dAc8f781FEd6"]).toBe(
      "100000000000000000000"
    );
  });
});

describe("getProof", () => {
  test("should return a valid proof for an address", () => {
    const proofForAddress = getProof(
      "0xA838E871A02C6d883bF004352Fc7dAc8f781FEd6",
      tree
    );
    expect(proofForAddress).toBeDefined();
  });

  test("should return undefined for an invalid address", () => {
    const proofForAddress = getProof("Invalid Address", tree);
    expect(proofForAddress).toBeUndefined();
  });
});
