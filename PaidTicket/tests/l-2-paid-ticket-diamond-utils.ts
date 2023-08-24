import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  DiamondCut,
  OwnershipTransferred,
  PaidTicketsMinted,
  PaidTicketsRefundedAndBurned,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer
} from "../generated/L2PaidTicketDiamond/L2PaidTicketDiamond"

export function createApprovalEvent(
  owner: Address,
  operator: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createDiamondCutEvent(
  facetCuts: Array<ethereum.Tuple>,
  target: Address,
  data: Bytes
): DiamondCut {
  let diamondCutEvent = changetype<DiamondCut>(newMockEvent())

  diamondCutEvent.parameters = new Array()

  diamondCutEvent.parameters.push(
    new ethereum.EventParam(
      "facetCuts",
      ethereum.Value.fromTupleArray(facetCuts)
    )
  )
  diamondCutEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  diamondCutEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return diamondCutEvent
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

export function createPaidTicketsMintedEvent(
  owner: Address,
  ticketIds: Array<BigInt>,
  naffleId: BigInt,
  ticketPriceInWei: BigInt,
  startingTicketId: BigInt
): PaidTicketsMinted {
  let paidTicketsMintedEvent = changetype<PaidTicketsMinted>(newMockEvent())

  paidTicketsMintedEvent.parameters = new Array()

  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  )
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  )
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPriceInWei",
      ethereum.Value.fromUnsignedBigInt(ticketPriceInWei)
    )
  )
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "startingTicketId",
      ethereum.Value.fromUnsignedBigInt(startingTicketId)
    )
  )

  return paidTicketsMintedEvent
}

export function createPaidTicketsRefundedAndBurnedEvent(
  owner: Address,
  naffleId: BigInt,
  ticketIds: Array<BigInt>,
  ticketIdsOnNaffle: Array<BigInt>
): PaidTicketsRefundedAndBurned {
  let paidTicketsRefundedAndBurnedEvent = changetype<
    PaidTicketsRefundedAndBurned
  >(newMockEvent())

  paidTicketsRefundedAndBurnedEvent.parameters = new Array()

  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  )
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  )
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIdsOnNaffle",
      ethereum.Value.fromUnsignedBigIntArray(ticketIdsOnNaffle)
    )
  )

  return paidTicketsRefundedAndBurnedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
