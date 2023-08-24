import {
  PaidTicketsMinted as PaidTicketsMintedEvent,
  PaidTicketsRefundedAndBurned as PaidTicketsRefundedAndBurnedEvent,
  Transfer as TransferEvent,
} from "../generated/L2PaidTicketDiamond/L2PaidTicketDiamond";
import { PaidTicket } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handlePaidTicketsMinted(event: PaidTicketsMintedEvent): void {
  let entity = new PaidTicket(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  entity.owner = event.params.owner;
  entity.ticketIdOnContract = event.params.startingTicketId;
  entity.save();
}

export function handlePaidTicketsRefundedAndBurned(
  event: PaidTicketsRefundedAndBurnedEvent
): void {
  let entity = PaidTicket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  if (entity != null) {
    entity.ticketIdOnNaffle = event.params.ticketIdsOnNaffle;
    entity.save();
  }
}

export function handleTransfer(event: TransferEvent): void {
  let entity = PaidTicket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
  );

  if (entity != null) {
    entity.ticketIdOnContract = event.params.tokenId;
    entity.save();
  }
}
