import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ChainlinkRequestFulfilled,
  NaffleWinnerRolled,
  OwnershipTransferred
} from "../generated/NaffleVRF/NaffleVRF"

export function createChainlinkRequestFulfilledEvent(
  requestId: BigInt,
  naffleId: BigInt,
  winningNumber: BigInt
): ChainlinkRequestFulfilled {
  let chainlinkRequestFulfilledEvent = changetype<ChainlinkRequestFulfilled>(
    newMockEvent()
  )

  chainlinkRequestFulfilledEvent.parameters = new Array()

  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  )
  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "winningNumber",
      ethereum.Value.fromUnsignedBigInt(winningNumber)
    )
  )

  return chainlinkRequestFulfilledEvent
}

export function createNaffleWinnerRolledEvent(
  naffleId: BigInt
): NaffleWinnerRolled {
  let naffleWinnerRolledEvent = changetype<NaffleWinnerRolled>(newMockEvent())

  naffleWinnerRolledEvent.parameters = new Array()

  naffleWinnerRolledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  )

  return naffleWinnerRolledEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
