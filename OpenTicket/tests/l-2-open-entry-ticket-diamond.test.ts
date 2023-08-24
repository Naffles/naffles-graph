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
import { OpenEntryTicket } from "../generated/schema";
import {
  createTicketsAttachedToNaffleEvent,
  createTicketsDetachedFromNaffleEvent,
} from "./l-2-open-entry-ticket-diamond-utils";
import {
  handleTicketsAttachedToNaffle,
  handleTicketsDetachedFromNaffle,
} from "../src/l-2-open-entry-ticket-diamond";
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
