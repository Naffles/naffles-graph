import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { logStore } from "matchstick-as/assembly/index";
import { PaidTicket } from "../generated/schema";
import {
  createPaidTicketsMintedEvent,
  createPaidTicketsRefundedAndBurnedEvent,
  createTransferEvent,
} from "./l-2-paid-ticket-diamond-utils";

import {
  handlePaidTicketsMinted,
  handlePaidTicketsRefundedAndBurned,
  handleTransfer,
} from "../src/l-2-paid-ticket-diamond";
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
