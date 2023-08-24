import {
  TicketsAttachedToNaffle as TicketsAttachedToNaffleEvent,
  TicketsDetachedFromNaffle as TicketsDetachedFromNaffleEvent,
} from "../generated/L2OpenEntryTicketDiamond/L2OpenEntryTicketDiamond";
import { OpenEntryTicket } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleTicketsAttachedToNaffle(
  event: TicketsAttachedToNaffleEvent
): void {
  let entity = new OpenEntryTicket(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  entity.naffleId = event.params.naffleId;
  entity.owner = event.params.owner;
  entity.ticketIdOnContract = event.params.startingTicketId;
  entity.save();
}

export function handleTicketsDetachedFromNaffle(
  event: TicketsDetachedFromNaffleEvent
): void {
  let entity = OpenEntryTicket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  if (entity != null) {
    entity.ticketIdOnNaffle = event.params.ticketIdsOnNaffle;
    entity.save();
  }
}
