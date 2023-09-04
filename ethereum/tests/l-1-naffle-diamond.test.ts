import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts";
import {
  createL1NaffleCreatedEvent,
  createL1NaffleCancelledEvent,
  createL1NaffleWinnerSetEvent,
  createChainlinkRequestFulfilledEvent,
} from "./l-1-naffle-diamond-utils";
import { L1Naffle } from "../generated/schema";
import {
  handleL1NaffleCancelled,
  handleL1NaffleCreated,
  handleL1NaffleWinnerSet,
} from "../src/l-1-naffle-diamond";
import { logStore } from "matchstick-as/assembly/store";

describe("L1Naffle", () => {
  afterAll(() => {
    clearStore();
  });

  test("should create a new Naffle", () => {
    let naffle = new L1Naffle(Bytes.fromI32(11));
    naffle.naffleIdOnContract = BigInt.fromI32(11);
    naffle.nftId = BigInt.fromI32(13);
    naffle.maxTickets = BigInt.fromI32(14);
    naffle.ticketPriceInWei = BigInt.fromI32(15);
    naffle.endDate = BigInt.fromI32(16);
    naffle.save();

    logStore();
    assert.fieldEquals("L1Naffle", "0x0b000000", "nftId", "13");
    assert.fieldEquals("L1Naffle", "0x0b000000", "naffleIdOnContract", "11");
    assert.fieldEquals("L1Naffle", "0x0b000000", "maxTickets", "14");
    assert.fieldEquals("L1Naffle", "0x0b000000", "ticketPriceInWei", "15");
    assert.fieldEquals("L1Naffle", "0x0b000000", "endDate", "16");
    clearStore();

    let newNaffleEvent = createL1NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      6,
      7
    );

    handleL1NaffleCreated(newNaffleEvent);
    logStore();

    assert.fieldEquals("L1Naffle", "0x01000000", "nftId", "2");
    assert.fieldEquals("L1Naffle", "0x01000000", "maxTickets", "3");
    assert.fieldEquals("L1Naffle", "0x01000000", "ticketPriceInWei", "4");
    assert.fieldEquals("L1Naffle", "0x01000000", "endDate", "5");

    clearStore();
  });

  test("should fail entity is not existing ", () => {
    let cancelNaffleEvent = createL1NaffleCancelledEvent(BigInt.fromI32(1));
    handleL1NaffleCancelled(cancelNaffleEvent);

    assert.notInStore("L1Naffle", "0x01000000");

    clearStore();
  });

  test("should cancel a existing Naffle", () => {
    let newNaffleEvent = createL1NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      6,
      7
    );

    handleL1NaffleCreated(newNaffleEvent);

    let cancelNaffleEvent = createL1NaffleCancelledEvent(BigInt.fromI32(1));
    handleL1NaffleCancelled(cancelNaffleEvent);

    logStore();

    assert.fieldEquals("L1Naffle", "0x01000000", "naffleStatus", "CLOSED");

    clearStore();
  });

  test("should set a winner Naffle", () => {
    let newNaffleEvent = createL1NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      6,
      7
    );

    handleL1NaffleCreated(newNaffleEvent);

    let winnerNaffleEvent = createL1NaffleWinnerSetEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a")
    );
    handleL1NaffleWinnerSet(winnerNaffleEvent);
    logStore();

    assert.notInStore("L1Naffle", "0x01000001");
    assert.fieldEquals(
      "L1Naffle",
      "0x01000000",
      "winnerAddress",
      "0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"
    );
    assert.fieldEquals("L1Naffle", "0x01000000", "naffleStatus", "FINISHED");

    clearStore();
  });
});
