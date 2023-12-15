import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getAllocationList, getProofForAddress } from "@/lib/merkle/merkle";
import { parse } from "csv-parse/sync";
import { TextEncoder } from "util";

const USER = "0xA838E871A02C6d883bF004352Fc7dAc8f781FEd6";

const csvData = parse(
  new TextEncoder().encode(`${USER},100000000000000000000
0x6efD5DBb3E3C96C4c8bc7376AAe263D1C0e7F532,100000000000000000000
0x70f2Db6D22593a65Dbb848C94eBACDF0344642F7,100000000000000000000`) as
    | string
    | Buffer,
);

let tree: StandardMerkleTree<any[]> | null;

beforeAll(() => {
  tree = StandardMerkleTree.of(csvData, ["address", "uint256"]);
});

describe("getAllocationList", () => {
  test("should return correct allocation object", () => {
    const allocations = getAllocationList(tree);
    expect(allocations[USER]).toBe("100000000000000000000");
  });
});

describe("getProofForAddress", () => {
  test("should return a valid proof for an address", () => {
    const proofForAddress = getProofForAddress(
      "0xA838E871A02C6d883bF004352Fc7dAc8f781FEd6",
      tree,
    );
    expect(proofForAddress).toBeDefined();
  });

  test("should return undefined for an invalid address", () => {
    const proofForAddress = getProofForAddress("Invalid Address", tree);
    expect(proofForAddress).toBeUndefined();
  });
});
