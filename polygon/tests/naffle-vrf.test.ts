import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { BigInt } from "@graphprotocol/graph-ts";
import { handleChainlinkRequestFulfilled } from "../src/naffle-vrf";
import { createChainlinkRequestFulfilledEvent } from "./naffle-vrf-utils";

describe("Describe entity assertions", () => {
  test("ChainlinkRequestFulfilled created and stored", () => {
    let requestId = BigInt.fromI32(12);
    let naffleId = BigInt.fromI32(11);
    let winningNumber = BigInt.fromI32(23);
    let newChainlinkRequestFulfilledEvent = createChainlinkRequestFulfilledEvent(
      requestId,
      naffleId,
      winningNumber
    );
    handleChainlinkRequestFulfilled(newChainlinkRequestFulfilledEvent);

    assert.entityCount("ChainlinkRequestFulfilled", 1);

    assert.fieldEquals(
      "ChainlinkRequestFulfilled",
      "0x0b000000",
      "requestId",
      "12"
    );
    assert.fieldEquals(
      "ChainlinkRequestFulfilled",
      "0x0b000000",
      "naffleId",
      "11"
    );
    assert.fieldEquals(
      "ChainlinkRequestFulfilled",
      "0x0b000000",
      "winningNumber",
      "23"
    );
  });
});
