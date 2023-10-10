import {
  L2NaffleCancelled as L2NaffleCancelledEvent,
  L2NaffleCreated as L2NaffleCreatedEvent,
  L2NaffleFinished as L2NaffleFinishedEvent,
  L2NafflePostponed as L2NafflePostponedEvent,
  OpenEntryTicketsUsed as OpenEntryTicketsUsedEvent,
  RandomNumberRequested as RandomNumberRequestedEvent,
  TicketsBought as TicketsBoughtEvent,
} from "../generated/L2NaffleDiamond/L2NaffleDiamond";
import {
  PaidTicketsMinted as PaidTicketsMintedEvent,
  PaidTicketsRefundedAndBurned as PaidTicketsRefundedAndBurnedEvent,
  TransferSingle as TransferSingleEvent,
  TransferBatch as TransferBatchEvent,
} from "../generated/L2PaidTicketDiamond/L2PaidTicketDiamond";
import {
  TicketsAttachedToNaffle as TicketsAttachedToNaffleEvent,
  TicketsDetachedFromNaffle as TicketsDetachedFromNaffleEvent,
  Transfer as TransferEvent,
} from "../generated/L2OpenEntryTicketDiamond/L2OpenEntryTicketDiamond";
import {
  L2Naffle,
  L2User,
  Collection,
  PaidTicket,
  OpenEntryTicket,
} from "../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleL2NaffleCancelled(event: L2NaffleCancelledEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  if (entity != null) {
    entity.canceledOnL1MessageHash = event.params.messageHash;
    entity.canceledOnL2TransactionHash = event.transaction.hash;
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.transactionHash = event.transaction.hash;
    entity.naffleStatus = "CLOSED";
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
  entity.maxOpenEntryTickets = event.params.openEntryTicketSpots;
  entity.ticketPriceInWei = event.params.ticketPriceInWei;
  entity.endDate = event.params.endTime;
  entity.timestampLastUpdate = event.block.timestamp;
  entity.blocknumberLastUpdate = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.naffleStatus = "ACTIVE";
  entity.type = event.params.naffleType

  let userEntity = L2User.load(event.params.owner);
  if (userEntity == null) {
    userEntity = new L2User(event.params.owner);
    userEntity.address = event.params.owner;
    userEntity.timestampLastUpdate = event.block.timestamp;
    userEntity.blocknumberLastUpdate = event.block.number;
    userEntity.transactionHash = event.transaction.hash;
    userEntity.save();
  }
  entity.owner = userEntity.id;

  let collectionEntity = Collection.load(event.params.ethTokenAddress);
  if (collectionEntity == null) {
    collectionEntity = new Collection(event.params.ethTokenAddress);
    collectionEntity.address = event.params.ethTokenAddress;
    collectionEntity.timestampLastUpdate = event.block.timestamp;
    collectionEntity.blocknumberLastUpdate = event.block.number;
    collectionEntity.transactionHash = event.transaction.hash;
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
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.transactionHash = event.transaction.hash;
    entity.naffleStatus = "FINISHED";
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
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.transactionHash = event.transaction.hash;
    entity.save();
  }
}

export function handleOpenEntryTicketsUsed(
  event: OpenEntryTicketsUsedEvent
): void {
    return;
}

export function handleTicketsBought(event: TicketsBoughtEvent): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
    return;
}

export function handleRandomNumberRequested(
  event: RandomNumberRequestedEvent
): void {
  let entity = L2Naffle.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );

  if (entity != null) {
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.randomNumberRequested = true;
    entity.naffleStatus = "SELECTING_WINNER"
    entity.save();
  }
}

export function handleTicketsAttachedToNaffle(
  event: TicketsAttachedToNaffleEvent
): void {
  for (let i = 0; i < event.params.ticketIds.length; i++) {
      let entity = new OpenEntryTicket(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params.ticketIds[i]))
      );
      entity.naffle = Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
      entity.owner = event.params.owner;
      entity.timestampLastUpdate = event.block.timestamp;
      entity.blocknumberLastUpdate = event.block.number;
      entity.transactionHash = event.transaction.hash;
      entity.ticketIdOnNaffle = event.params.startingTicketId.plus(BigInt.fromI32(i)).minus(BigInt.fromI32(1));
      entity.ticketIdOnContract = event.params.ticketIds[i];
      entity.save();
  }
}

export function handleTicketsDetachedFromNaffle(
  event: TicketsDetachedFromNaffleEvent
): void {
  for (let i = 0; i < event.params.ticketIds.length; i++) {
        let entity = OpenEntryTicket.load(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params.ticketIds[i]))
        );

        if (entity != null) {
            entity.timestampLastUpdate = event.block.timestamp;
            entity.blocknumberLastUpdate = event.block.number;
            entity.transactionHash = event.transaction.hash;
            entity.ticketIdOnNaffle = null;
            entity.save();
        }
    }
}

export function handlePaidTicketsMinted(event: PaidTicketsMintedEvent): void {
  let userEntity = L2User.load(event.params.owner);
  if (userEntity == null) {
    userEntity = new L2User(event.params.owner);
    userEntity.address = event.params.owner;
    userEntity.timestampLastUpdate = event.block.timestamp;
    userEntity.blocknumberLastUpdate = event.block.number;
    userEntity.transactionHash = event.transaction.hash;
    userEntity.save();
  }

  for (let i = BigInt.fromI32(0); i < event.params.amount; i.plus(BigInt.fromI32(1))) {
      let ticketId = event.params.startingTicketId.plus(i);
      let entity = new PaidTicket(
        Bytes.fromByteArray(Bytes.fromBigInt(ticketId))
      );
      entity.naffle = Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
      entity.owner = userEntity.id;
      entity.timestampLastUpdate = event.block.timestamp;
      entity.blocknumberLastUpdate = event.block.number;
      entity.transactionHash = event.transaction.hash;
      entity.ticketIdOnContract = ticketId;
      entity.ticketIdOnNaffle = event.params.startingTicketId.plus(i);
      entity.redeemed = false;
      entity.refunded = false;
      entity.save();
    }
}

// export function handlePaidTicketsRefundedAndBurned(
//   event: PaidTicketsRefundedAndBurnedEvent
// ): void {
//   let userEntity = L2User.load(event.params.owner);
//   let tickets = userEntity?.paidTickets.load();
//   if (tickets == null) {
//     return;
//   }
//   // the amount in paidTicketsRefundedAndBurned is always the total amount of tickets a user has.
//   // so we can just loop through all the user tickets and mark them as refunded for a specific naffle
//   for (let i = 0; i < tickets?.length; i++) {
//         let entity: PaidTicket = tickets[i];
//         if (entity.naffle == null) {
//             continue
//         }
//         let naffle = L2Naffle.load(entity.naffle);
//         if (naffle == null) {
//             continue;
//         }
//         if (naffle.naffleIdOnContract == event.params.naffleId) {
//             entity.timestampLastUpdate = event.block.timestamp;
//             entity.blocknumberLastUpdate = event.block.number;
//             entity.transactionHash = event.transaction.hash;
//             entity.refunded = true;
//             entity.save();
//         }
//     }
// }

export function handleTransferOpenEntry(event: TransferEvent): void {
  let entity = OpenEntryTicket.load(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
  );
  if (entity == null) {
    entity = new OpenEntryTicket(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params.tokenId))
    );
  }

  let userEntity = L2User.load(event.params.to);

  if (userEntity == null) {
    userEntity = new L2User(event.params.to);
    userEntity.address = event.params.to;
    userEntity.timestampLastUpdate = event.block.timestamp;
    userEntity.blocknumberLastUpdate = event.block.number;
    userEntity.transactionHash = event.transaction.hash;
    userEntity.save();
  }

  if (entity != null) {
    entity.owner = userEntity.id;
    entity.ticketIdOnContract = event.params.tokenId;
    entity.timestampLastUpdate = event.block.timestamp;
    entity.blocknumberLastUpdate = event.block.number;
    entity.transactionHash = event.transaction.hash;
    entity.save();
  }
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let fromUserEntity = L2User.load(event.params.from);
  if (fromUserEntity == null) {
    fromUserEntity = new L2User(event.params.from);
    fromUserEntity.address = event.params.from;
    fromUserEntity.timestampLastUpdate = event.block.timestamp;
    fromUserEntity.blocknumberLastUpdate = event.block.number;
    fromUserEntity.transactionHash = event.transaction.hash;
    fromUserEntity.save();
  }

  let toUserEntity = L2User.load(event.params.to);
  if (toUserEntity == null) {
    toUserEntity = new L2User(event.params.to);
    toUserEntity.address = event.params.to;
    toUserEntity.timestampLastUpdate = event.block.timestamp;
    toUserEntity.blocknumberLastUpdate = event.block.number;
    toUserEntity.transactionHash = event.transaction.hash;
    toUserEntity.save();
  }

  var amountTransferred = BigInt.fromI32(0);

  // let paidTickets = fromUserEntity.paidTickets.load();
  // if (paidTickets != null) {
  //   for (let i = 0; i < paidTickets.length; i++) {
  //       let paidTicket: PaidTicket = paidTickets[i];
  //       let naffleId = paidTicket.naffle;
  //       if (naffleId == null) {
  //           // this never happens but generated code thinks it can
  //           continue
  //       }
  //       let naffle = L2Naffle.load(naffleId);
  //       if (naffle == null) {
  //           // this never happens but generated code thinks it can
  //           continue;
  //       }
  //       if (naffle.naffleIdOnContract == event.params.id) {
  //           paidTicket.timestampLastUpdate = event.block.timestamp;
  //           paidTicket.blocknumberLastUpdate = event.block.number;
  //           paidTicket.transactionHash = event.transaction.hash;
  //           paidTicket.owner = toUserEntity.id;
  //           paidTicket.save();
  //           amountTransferred = amountTransferred.plus(BigInt.fromI32(1));
  //       }
  //       if (amountTransferred == event.params.value) {
  //           return;
  //       }
  //   }
  // }
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let fromUserEntity = L2User.load(event.params.from);
  if (fromUserEntity == null) {
    fromUserEntity = new L2User(event.params.from);
    fromUserEntity.address = event.params.from;
    fromUserEntity.timestampLastUpdate = event.block.timestamp;
    fromUserEntity.blocknumberLastUpdate = event.block.number;
    fromUserEntity.transactionHash = event.transaction.hash;
    fromUserEntity.save();
  }

  let toUserEntity = L2User.load(event.params.to);
  if (toUserEntity == null) {
    toUserEntity = new L2User(event.params.to);
    toUserEntity.address = event.params.to;
    toUserEntity.timestampLastUpdate = event.block.timestamp;
    toUserEntity.blocknumberLastUpdate = event.block.number;
    toUserEntity.transactionHash = event.transaction.hash;
    toUserEntity.save();
  }

  let paidTickets = fromUserEntity.paidTickets.load();
    if (paidTickets != null) {
        for (let k = 0; k < event.params.ids.length; k++) {
        var amountTransferred = BigInt.fromI32(0);
          let currentNaffleId = event.params.ids[k];
            for (let i = 0; i < paidTickets.length; i++) {
                let paidTicket: PaidTicket = paidTickets[i];
                let naffleId = paidTicket.naffle;
                if (!naffleId) {
                    // this never happens but generated code thinks it can
                    continue
                }
                let naffle = L2Naffle.load(naffleId);
                if (naffle == null) {
                    // this never happens but generated code thinks it can
                    continue;
                }
                let naffleIdOnContract = naffle.naffleIdOnContract;
                if (!naffleIdOnContract) {
                    // this never happens but generated code thinks it can
                    continue;
                }
                if (naffleIdOnContract.equals(currentNaffleId)) {
                    paidTicket.timestampLastUpdate = event.block.timestamp;
                    paidTicket.blocknumberLastUpdate = event.block.number;
                    paidTicket.transactionHash = event.transaction.hash;
                    paidTicket.owner = toUserEntity.id;
                    paidTicket.save();
                    amountTransferred = amountTransferred.plus(BigInt.fromI32(1));
                }
                if (amountTransferred == event.params.values[k]) {
                    break;
                }
            }
        }
    }
}
