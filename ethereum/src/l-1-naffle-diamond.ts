import {
  L1NaffleCancelled as L1NaffleCancelledEvent,
  L1NaffleCreated as L1NaffleCreatedEvent,
  L1NaffleWinnerSet as L1NaffleWinnerSetEvent,
} from "../generated/L1NaffleDiamond/L1NaffleDiamond";
import {
  ChainlinkRequestFulfilled as ChainlinkRequestFulfilledEvent,
  NaffleWinnerRolled as NaffleWinnerRolledEvent,
} from "../generated/NaffleVRF/NaffleVRF";

import { Collection, L1Naffle, L1User } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleL1NaffleCancelled(event: L1NaffleCancelledEvent): void {
  let entity = L1Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.naffleStatus = "CLOSED";
    entity.save();
  }
}

export function handleL1NaffleCreated(event: L1NaffleCreatedEvent): void {
  let entity = new L1Naffle(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  entity.naffleIdOnContract = event.params.naffleId;
  entity.nftId = event.params.nftId;
  entity.maxTickets = event.params.paidTicketSpots;
  entity.ticketPriceInWei = event.params.ticketPriceInWei;
  entity.endDate = event.params.endTime;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  let userEntity = L1User.load(event.params.owner);
  if (userEntity == null) {
    userEntity = new L1User(event.params.owner);
    userEntity.address = event.params.owner;
    userEntity.blockTimestamp = event.block.timestamp;
    userEntity.transactionHash = event.transaction.hash;
    userEntity.save();
  }
  entity.owner = userEntity.id;

  let collectionEntity = Collection.load(event.params.owner);
  if (collectionEntity == null) {
    collectionEntity = new Collection(event.params.owner);
    collectionEntity.address = event.params.owner;
    collectionEntity.blockTimestamp = event.block.timestamp;
    collectionEntity.transactionHash = event.transaction.hash;
    collectionEntity.save();
  }
  entity.collection = collectionEntity.id;

  entity.save();
}

export function handleL1NaffleWinnerSet(event: L1NaffleWinnerSetEvent): void {
  let entity = L1Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.winnerAddress = event.params.winner;
    entity.naffleStatus = "FINISHED";
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.save();
  }
}

export function handleChainlinkRequestFulfilled(
  event: ChainlinkRequestFulfilledEvent
): void {
  let entity = L1Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.requestId = event.params.requestId;
    entity.winningNumber = event.params.winningNumber;

    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
  }
}

export function handleNaffleWinnerRolled(event: NaffleWinnerRolledEvent): void {
  let entity = L1Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.randomNumberGenerated = true;
    entity.save();
  }
}
