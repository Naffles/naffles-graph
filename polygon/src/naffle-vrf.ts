import {
  ChainlinkRequestFulfilled as ChainlinkRequestFulfilledEvent,
  NaffleWinnerRolled as NaffleWinnerRolledEvent,
} from "../generated/NaffleVRF/NaffleVRF";
import {
  ChainlinkRequestFulfilled,
  NaffleWinnerRolled,
} from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleChainlinkRequestFulfilled(
  event: ChainlinkRequestFulfilledEvent
): void {
  let entity = new ChainlinkRequestFulfilled(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  entity.requestId = event.params.requestId;
  entity.naffleId = event.params.naffleId;
  entity.winningNumber = event.params.winningNumber;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNaffleWinnerRolled(event: NaffleWinnerRolledEvent): void {
  let entity = new NaffleWinnerRolled(
    Bytes.fromByteArray(Bytes.fromBigInt(event.params.naffleId))
  );
  entity.naffleId = event.params.naffleId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
