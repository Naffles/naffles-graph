import {
  assert,
  describe,
  test,
  clearStore,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleUserStaked, handleUserUnstaked } from "../src/founders-key-staking"
import { createUserStakedEvent, createUserUnstakedEvent } from "./founders-key-staking-utils"
import { logStore } from "matchstick-as/assembly/store";

describe("Founder key staking", () => {
  test("Stakes persisted", () => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let event1 = createUserStakedEvent(userAddress, 1, BigInt.fromI32(0), 0);
    let event2 = createUserStakedEvent(userAddress, 2, BigInt.fromI32(0), 2);
    handleUserStaked(event1);
    handleUserStaked(event2);

    assert.entityCount("Stake", 2);
    assert.fieldEquals("Stake", "1", "userAddress", userAddress.toHexString())
    assert.fieldEquals("Stake", "1", "stakingPeriod", "0")
    assert.fieldEquals("Stake", "2", "userAddress", userAddress.toHexString())
    assert.fieldEquals("Stake", "2", "stakingPeriod", "2")
  })

  test("Stake removed", () => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let createEvent1 = createUserStakedEvent(userAddress, 1, BigInt.fromI32(0), 0);
    let createEvent2 = createUserStakedEvent(userAddress, 2, BigInt.fromI32(0), 2);
    handleUserStaked(createEvent1);
    handleUserStaked(createEvent2);

    let removeEvent = createUserUnstakedEvent(userAddress, 1, BigInt.fromI32(0));
    handleUserUnstaked(removeEvent);

    assert.entityCount("Stake", 1);
    assert.fieldEquals("Stake", "2", "userAddress", userAddress.toHexString())
    assert.fieldEquals("Stake", "2", "stakingPeriod", "2")
  })

  afterAll(() => {
    clearStore()
  })
})
