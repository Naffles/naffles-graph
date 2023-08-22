import {
  L2NaffleCancelled as L2NaffleCancelledEvent,
  L2NaffleCreated as L2NaffleCreatedEvent,
  L2NaffleFinished as L2NaffleFinishedEvent,
  L2NafflePostponed as L2NafflePostponedEvent,
  OpenEntryTicketsUsed as OpenEntryTicketsUsedEvent,
  TicketsBought as TicketsBoughtEvent,
} from "../generated/L2NaffleDiamond/L2NaffleDiamond";
import { L2Naffle, Collection, L2User } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleL2NaffleCancelled(event: L2NaffleCancelledEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.canceledOnL1MessageHash = event.params.messageHash;
    entity.canceledOnL2TransactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleL2NaffleCreated(event: L2NaffleCreatedEvent): void {
  let entity = new L2Naffle(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  entity.naffleIdOnContract = event.params.naffleId;
  entity.nftId = event.params.nftId;
  entity.maxTickets = event.params.paidTicketSpots;
  entity.ticketPriceInWei = event.params.ticketPriceInWei;
  entity.endDate = event.params.endTime;

  let userEntity = L2User.load(event.params.owner);
  if (userEntity == null) {
    userEntity = new L2User(event.params.owner);
    userEntity.address = event.params.owner;
    userEntity.save();
  }
  entity.owner = userEntity.id;

  let collectionEntity = Collection.load(event.params.owner);
  if (collectionEntity == null) {
    collectionEntity = new Collection(event.params.owner);
    collectionEntity.address = event.params.owner;
    collectionEntity.save();
  }
  entity.collection = collectionEntity.id;

  entity.save();
}

export function handleL2NaffleFinished(event: L2NaffleFinishedEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.winnerAddress = event.params.winner;
    entity.winnerSetOnL1MessageHash = event.params.messageHash;
    entity.winnerSetOnL2TransactionHash = event.transaction.hash;
    entity.save();
  }
}

export function handleL2NafflePostponed(event: L2NafflePostponedEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.endDate = event.params.newEndTime;
    entity.naffleStatus = "POSTPONED";
    entity.save();
  }
}

export function handleOpenEntryTicketsUsed(
  event: OpenEntryTicketsUsedEvent
): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.save();
  }
}

export function handleTicketsBought(event: TicketsBoughtEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.save();
  }
}
