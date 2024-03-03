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
    entity.canceledOnL1 = true;
    entity.save();
  }
 
}

export function handleL1NaffleCreated(event: L1NaffleCreatedEvent): void {
  let entity = new L1Naffle(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  entity.naffleIdOnContract = event.params.naffleId;
  entity.nftId = event.params.naffleTokenInformation.nftId;
  entity.maxTickets = event.params.paidTicketSpots;
  entity.ticketPriceInWei = event.params.ticketPriceInWei;
  entity.endDate = event.params.endTime;
  entity.timestampLastUpdate = event.block.timestamp;
  entity.blocknumberLastUpdate = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.naffleStatus = "ACTIVE";
  entity.type = event.params.naffleType;
  if (event.params.naffleTokenInformation.naffleTokenType == 0) {
    entity.tokenType = "ERC721";
  } else if (event.params.naffleTokenInformation.naffleTokenType == 1) {
    entity.tokenType = "ERC1155";
  } else if (event.params.naffleTokenInformation.naffleTokenType == 2) {
    entity.tokenType = "ERC20";
  }

  entity.amount = event.params.naffleTokenInformation.amount;
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

  let collectionEntity = Collection.load(event.params.naffleTokenInformation.tokenAddress);
  if (collectionEntity == null) {
    collectionEntity = new Collection(event.params.naffleTokenInformation.tokenAddress);
    collectionEntity.address = event.params.naffleTokenInformation.tokenAddress;
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
    entity.winnerSetOnL1 = true;
    entity.save();
  }
}
