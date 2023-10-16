import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  Paused,
  Unpaused,
  UserStaked,
  UserUnstaked
} from "../generated/FoundersKeyStaking/FoundersKeyStaking"

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

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUserStakedEvent(
  userAddress: Address,
  nftId: i32,
  stakeTime: BigInt,
  stakingPeriod: i32
): UserStaked {
  let userStakedEvent = changetype<UserStaked>(newMockEvent())

  userStakedEvent.parameters = new Array()

  userStakedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userStakedEvent.parameters.push(
    new ethereum.EventParam(
      "nftId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(nftId))
    )
  )
  userStakedEvent.parameters.push(
    new ethereum.EventParam(
      "stakeTime",
      ethereum.Value.fromUnsignedBigInt(stakeTime)
    )
  )
  userStakedEvent.parameters.push(
    new ethereum.EventParam(
      "stakingPeriod",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stakingPeriod))
    )
  )

  return userStakedEvent
}

export function createUserUnstakedEvent(
  userAddress: Address,
  nftId: i32,
  unstakeTime: BigInt
): UserUnstaked {
  let userUnstakedEvent = changetype<UserUnstaked>(newMockEvent())

  userUnstakedEvent.parameters = new Array()

  userUnstakedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userUnstakedEvent.parameters.push(
    new ethereum.EventParam(
      "nftId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(nftId))
    )
  )
  userUnstakedEvent.parameters.push(
    new ethereum.EventParam(
      "unstakeTime",
      ethereum.Value.fromUnsignedBigInt(unstakeTime)
    )
  )

  return userUnstakedEvent
}
