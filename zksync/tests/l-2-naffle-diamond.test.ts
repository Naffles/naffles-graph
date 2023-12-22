import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts";

import { L2Naffle } from "../generated/schema";

import { logStore } from "matchstick-as/assembly/store";
import {
  createL2NaffleCancelledEvent,
  createL2NaffleCreatedEvent,
  createL2NaffleFinishedEvent,
  createL2NafflePostponedEvent,
  createTicketsAttachedToNaffleEvent,
  createTicketsDetachedFromNaffleEvent,
  createPaidTicketsMintedEvent,
  createPaidTicketsRefundedAndBurnedEvent,
  createTransferEvent,
} from "./l-2-naffle-DAIMOND-utils";
import {
  handleL2NaffleCancelled,
  handleL2NaffleCreated,
  handleL2NaffleFinished,
  handleL2NafflePostponed,
  handlePaidTicketsMinted,
  handlePaidTicketsRefundedAndBurned,
  handleTicketsAttachedToNaffle,
  handleTicketsDetachedFromNaffle,
  handleTransfer,
} from "../src/l-2-naffle-DAIMOND";

describe("L2Naffle", () => {
  afterAll(() => {
    clearStore();
  });

  test("should create a new Naffle", () => {
    let naffle = new L2Naffle(Bytes.fromI32(11));
    naffle.naffleIdOnContract = BigInt.fromI32(11);
    naffle.nftId = BigInt.fromI32(13);
    naffle.maxTickets = BigInt.fromI32(14);
    naffle.ticketPriceInWei = BigInt.fromI32(15);
    naffle.endDate = BigInt.fromI32(16);
    naffle.save();

    logStore();
    assert.fieldEquals("L2Naffle", "0x0b000000", "nftId", "13");
    clearStore();

    let newNaffleEvent = createL2NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      BigInt.fromI32(6),
      7,
      8
    );

    handleL2NaffleCreated(newNaffleEvent);
    logStore();

    assert.fieldEquals("L2Naffle", "0x01000000", "nftId", "2");
    assert.fieldEquals("L2Naffle", "0x01000000", "maxTickets", "3");
    assert.fieldEquals("L2Naffle", "0x01000000", "ticketPriceInWei", "5");
    assert.fieldEquals("L2Naffle", "0x01000000", "endDate", "6");

    clearStore();
  });

  test("should fail entity is not existing ", () => {
    let cancelNaffleEvent = createL2NaffleCancelledEvent(
      BigInt.fromI32(1),
      Bytes.fromI32(100)
    );
    handleL2NaffleCancelled(cancelNaffleEvent);

    assert.notInStore("L2Naffle", "0x01110000");

    clearStore();
  });

  test("should cancel a existing Naffle", () => {
    let newNaffleEvent = createL2NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      BigInt.fromI32(6),
      7,
      8
    );

    handleL2NaffleCreated(newNaffleEvent);

    let cancelNaffleEvent = createL2NaffleCancelledEvent(
      BigInt.fromI32(1),
      Bytes.fromI32(1)
    );
    handleL2NaffleCancelled(cancelNaffleEvent);

    logStore();

    assert.fieldEquals(
      "L2Naffle",
      "0x01000000",
      "canceledOnL1MessageHash",
      "0x01000000"
    );

    clearStore();
  });

  test("should finish a Naffle", () => {
    let newNaffleEvent = createL2NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      BigInt.fromI32(6),
      7,
      8
    );

    handleL2NaffleCreated(newNaffleEvent);

    let finishNaffleEvent = createL2NaffleFinishedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(10),
      Bytes.fromI32(100)
    );
    handleL2NaffleFinished(finishNaffleEvent);

    logStore();
    assert.fieldEquals(
      "L2Naffle",
      "0x01000000",
      "winnerAddress",
      "0x89205a3a3b2a69de6dbf7f01ed13b2108b2c43e7"
    );
    assert.fieldEquals(
      "L2Naffle",
      "0x01000000",
      "winnerSetOnL1MessageHash",
      "0x64000000" // 100 to bytes
    );

    clearStore();
  });

  test("should postpone a Naffle", () => {
    let newNaffleEvent = createL2NaffleCreatedEvent(
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A"),
      Address.fromString("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"),
      BigInt.fromI32(2),
      BigInt.fromI32(3),
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      BigInt.fromI32(6),
      7,
      8
    );

    handleL2NaffleCreated(newNaffleEvent);
    let postponeNaffleEvent = createL2NafflePostponedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(1)
    );
    handleL2NafflePostponed(postponeNaffleEvent);
    logStore();

    assert.fieldEquals("L2Naffle", "0x01000000", "endDate", "1");
    assert.fieldEquals("L2Naffle", "0x01000000", "naffleStatus", "POSTPONED");
  });
});

describe("Describe Paid Ticket", () => {
  afterAll(() => {
    clearStore();
  });

  test("should paid ticket minted", () => {
    let newPaidTicketEvent = createPaidTicketsMintedEvent(
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      BigInt.fromI32(1),
      BigInt.fromI32(2),
      BigInt.fromI32(3)
    );

    handlePaidTicketsMinted(newPaidTicketEvent);
    logStore();

    assert.fieldEquals(
      "PaidTicket",
      "0x01000000",
      "owner",
      "0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"
    );

    assert.fieldEquals("PaidTicket", "0x01000000", "ticketIdOnContract", "3");
    clearStore();
  });

  test("should refund and burn paid ticket", () => {
    let newPaidTicketEvent = createPaidTicketsMintedEvent(
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      BigInt.fromI32(1),
      BigInt.fromI32(2),
      BigInt.fromI32(3)
    );

    handlePaidTicketsMinted(newPaidTicketEvent);
    logStore();

    assert.fieldEquals(
      "PaidTicket",
      "0x01000000",
      "owner",
      "0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"
    );
    assert.fieldEquals("PaidTicket", "0x01000000", "ticketIdOnContract", "3");

    let refundTicketEvent = createPaidTicketsRefundedAndBurnedEvent(
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      BigInt.fromI32(1),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)]
    );
    handlePaidTicketsRefundedAndBurned(refundTicketEvent);

    assert.fieldEquals(
      "PaidTicket",
      "0x01000000",
      "ticketIdOnNaffle",
      "[1, 2, 3]"
    );
    logStore();
  });

  test("should test transfer event", () => {
    let newPaidTicketEvent = createPaidTicketsMintedEvent(
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      BigInt.fromI32(1),
      BigInt.fromI32(2),
      BigInt.fromI32(3)
    );

    handlePaidTicketsMinted(newPaidTicketEvent);
    logStore();

    assert.fieldEquals(
      "PaidTicket",
      "0x01000000",
      "owner",
      "0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"
    );

    let newTransferEvent = createTransferEvent(
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      Address.fromString("0x82ba3449f70d0ba6d51dccad45d0f1a55b5c587a"),
      BigInt.fromI32(1)
    );

    assert.fieldEquals("PaidTicket", "0x01000000", "ticketIdOnContract", "3");
    logStore();
  });
});

describe("Describe Open Entry Ticket", () => {
  afterAll(() => {
    clearStore();
  });

  test("should ticket attached to naffle", () => {
    let newEntryTicketEvent = createTicketsAttachedToNaffleEvent(
      BigInt.fromI32(1),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A")
    );

    handleTicketsAttachedToNaffle(newEntryTicketEvent);
    logStore();

    assert.fieldEquals("OpenEntryTicket", "0x01000000", "naffleId", "1");
    assert.fieldEquals(
      "OpenEntryTicket",
      "0x01000000",
      "ticketIdOnContract",
      "1"
    );

    clearStore();
  });

  test("should ticket detached from naffle", () => {
    let newEntryTicketEvent = createTicketsAttachedToNaffleEvent(
      BigInt.fromI32(1),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      BigInt.fromI32(1),
      Address.fromString("0x82ba3449F70D0BA6D51dCCAd45d0f1a55B5C587A")
    );

    handleTicketsAttachedToNaffle(newEntryTicketEvent);
    logStore();

    let detachTicketEvent = createTicketsDetachedFromNaffleEvent(
      BigInt.fromI32(1),
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)],
      [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)]
    );
    handleTicketsDetachedFromNaffle(detachTicketEvent);

    assert.fieldEquals(
      "OpenEntryTicket",
      "0x01000000",
      "ticketIdOnNaffle",
      "[1, 2, 3]"
    );
  });
});
