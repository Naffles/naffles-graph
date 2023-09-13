import {
  L1NaffleCancelled as L1NaffleCancelledEvent,
  L1NaffleCreated as L1NaffleCreatedEvent,
  L1NaffleWinnerSet as L1NaffleWinnerSetEvent,
} from "../generated/L1NaffleDiamond/L1NaffleDiamond";

import { Collection, L1Naffle, L1User } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleL1NaffleCancelled(event: L1NaffleCancelledEvent): void {
  let entity = L1Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
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
  entity.timestampLastUpdate = event.block.timestamp;
  entity.blocknumberLastUpdate = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.naffleStatus = "ACTIVE";
  entity.type = event.params.naffleType;
  let userEntity = L1User.load(event.params.owner);
  if (userEntity == null) {
    userEntity = new L1User(event.params.owner);
    userEntity.address = event.params.owner;
    userEntity.timestampLastUpdate = event.block.timestamp;
    userEntity.blocknumberLastUpdate = event.block.number;
    userEntity.transactionHash = event.transaction.hash;
    userEntity.save();
  }
  entity.owner = userEntity.id;

  let collectionEntity = Collection.load(event.params.owner);
  if (collectionEntity == null) {
    collectionEntity = new Collection(event.params.owner);
    collectionEntity.address = event.params.owner;
    collectionEntity.timestampLastUpdate = event.block.timestamp;
    collectionEntity.blocknumberLastUpdate = event.block.number;
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
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.transactionHash = event.transaction.hash;
    entity.save();
  }
}
