import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  UserStaked,
  UserUnstaked
} from "../generated/FoundersKeyStaking/FoundersKeyStaking"

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
