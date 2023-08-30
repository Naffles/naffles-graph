import { newMockEvent } from "matchstick-as";
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts";
import {
  L2NaffleCancelled,
  L2NaffleCreated,
  L2NaffleFinished,
  L2NafflePostponed,
  OpenEntryTicketsUsed,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TicketsBought,
} from "../generated/L2NaffleDiamond/L2NaffleDiamond";

import {
  TicketsAttachedToNaffle,
  TicketsDetachedFromNaffle,
  Transfer,
} from "../generated/L2OpenEntryTicketDiamond/L2OpenEntryTicketDiamond";

import {
  PaidTicketsMinted,
  PaidTicketsRefundedAndBurned,
} from "../generated/L2PaidTicketDiamond/L2PaidTicketDiamond";

export function createL2NaffleCancelledEvent(
  naffleId: BigInt,
  messageHash: Bytes
): L2NaffleCancelled {
  let l2NaffleCancelledEvent = changetype<L2NaffleCancelled>(newMockEvent());

  l2NaffleCancelledEvent.parameters = new Array();

  l2NaffleCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l2NaffleCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "messageHash",
      ethereum.Value.fromFixedBytes(messageHash)
    )
  );

  return l2NaffleCancelledEvent;
}

export function createL2NaffleCreatedEvent(
  naffleId: BigInt,
  owner: Address,
  ethTokenAddress: Address,
  nftId: BigInt,
  paidTicketSpots: BigInt,
  openEntryTicketSpots: BigInt,
  ticketPriceInWei: BigInt,
  endTime: BigInt,
  naffleType: i32,
  tokenContractType: i32
): L2NaffleCreated {
  let l2NaffleCreatedEvent = changetype<L2NaffleCreated>(newMockEvent());

  l2NaffleCreatedEvent.parameters = new Array();

  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ethTokenAddress",
      ethereum.Value.fromAddress(ethTokenAddress)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "paidTicketSpots",
      ethereum.Value.fromUnsignedBigInt(paidTicketSpots)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "openEntryTicketSpots",
      ethereum.Value.fromUnsignedBigInt(openEntryTicketSpots)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPriceInWei",
      ethereum.Value.fromUnsignedBigInt(ticketPriceInWei)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(naffleType))
    )
  );
  l2NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tokenContractType))
    )
  );

  return l2NaffleCreatedEvent;
}

export function createL2NaffleFinishedEvent(
  naffleId: BigInt,
  winner: Address,
  winningTicketIdOnNaffle: BigInt,
  messageHash: Bytes
): L2NaffleFinished {
  let l2NaffleFinishedEvent = changetype<L2NaffleFinished>(newMockEvent());

  l2NaffleFinishedEvent.parameters = new Array();

  l2NaffleFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l2NaffleFinishedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  );
  l2NaffleFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "winningTicketIdOnNaffle",
      ethereum.Value.fromUnsignedBigInt(winningTicketIdOnNaffle)
    )
  );
  l2NaffleFinishedEvent.parameters.push(
    new ethereum.EventParam(
      "messageHash",
      ethereum.Value.fromFixedBytes(messageHash)
    )
  );

  return l2NaffleFinishedEvent;
}

export function createL2NafflePostponedEvent(
  naffleId: BigInt,
  newEndTime: BigInt
): L2NafflePostponed {
  let l2NafflePostponedEvent = changetype<L2NafflePostponed>(newMockEvent());

  l2NafflePostponedEvent.parameters = new Array();

  l2NafflePostponedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l2NafflePostponedEvent.parameters.push(
    new ethereum.EventParam(
      "newEndTime",
      ethereum.Value.fromUnsignedBigInt(newEndTime)
    )
  );

  return l2NafflePostponedEvent;
}

export function createOpenEntryTicketsUsedEvent(
  naffleId: BigInt,
  owner: Address,
  ticketIds: Array<BigInt>
): OpenEntryTicketsUsed {
  let openEntryTicketsUsedEvent = changetype<OpenEntryTicketsUsed>(
    newMockEvent()
  );

  openEntryTicketsUsedEvent.parameters = new Array();

  openEntryTicketsUsedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  openEntryTicketsUsedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  openEntryTicketsUsedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );

  return openEntryTicketsUsedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent());

  roleAdminChangedEvent.parameters = new Array();

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  );

  return roleAdminChangedEvent;
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent());

  roleGrantedEvent.parameters = new Array();

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleGrantedEvent;
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent());

  roleRevokedEvent.parameters = new Array();

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleRevokedEvent;
}

export function createTicketsBoughtEvent(
  naffleId: BigInt,
  buyer: Address,
  ticketIds: Array<BigInt>,
  ticketPriceInWei: BigInt
): TicketsBought {
  let ticketsBoughtEvent = changetype<TicketsBought>(newMockEvent());

  ticketsBoughtEvent.parameters = new Array();

  ticketsBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  ticketsBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  );
  ticketsBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );
  ticketsBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPriceInWei",
      ethereum.Value.fromUnsignedBigInt(ticketPriceInWei)
    )
  );

  return ticketsBoughtEvent;
}

export function createTicketsAttachedToNaffleEvent(
  naffleId: BigInt,
  ticketIds: Array<BigInt>,
  startingTicketId: BigInt,
  owner: Address
): TicketsAttachedToNaffle {
  let ticketsAttachedToNaffleEvent = changetype<TicketsAttachedToNaffle>(
    newMockEvent()
  );

  ticketsAttachedToNaffleEvent.parameters = new Array();

  ticketsAttachedToNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  ticketsAttachedToNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );
  ticketsAttachedToNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "startingTicketId",
      ethereum.Value.fromUnsignedBigInt(startingTicketId)
    )
  );
  ticketsAttachedToNaffleEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );

  return ticketsAttachedToNaffleEvent;
}

export function createTicketsDetachedFromNaffleEvent(
  naffleId: BigInt,
  ticketIds: Array<BigInt>,
  ticketIdsOnNaffle: Array<BigInt>
): TicketsDetachedFromNaffle {
  let ticketsDetachedFromNaffleEvent = changetype<TicketsDetachedFromNaffle>(
    newMockEvent()
  );

  ticketsDetachedFromNaffleEvent.parameters = new Array();

  ticketsDetachedFromNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  ticketsDetachedFromNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );
  ticketsDetachedFromNaffleEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIdsOnNaffle",
      ethereum.Value.fromUnsignedBigIntArray(ticketIdsOnNaffle)
    )
  );

  return ticketsDetachedFromNaffleEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  return transferEvent;
}

export function createPaidTicketsMintedEvent(
  owner: Address,
  ticketIds: Array<BigInt>,
  naffleId: BigInt,
  ticketPriceInWei: BigInt,
  startingTicketId: BigInt
): PaidTicketsMinted {
  let paidTicketsMintedEvent = changetype<PaidTicketsMinted>(newMockEvent());

  paidTicketsMintedEvent.parameters = new Array();

  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPriceInWei",
      ethereum.Value.fromUnsignedBigInt(ticketPriceInWei)
    )
  );
  paidTicketsMintedEvent.parameters.push(
    new ethereum.EventParam(
      "startingTicketId",
      ethereum.Value.fromUnsignedBigInt(startingTicketId)
    )
  );

  return paidTicketsMintedEvent;
}

export function createPaidTicketsRefundedAndBurnedEvent(
  owner: Address,
  naffleId: BigInt,
  ticketIds: Array<BigInt>,
  ticketIdsOnNaffle: Array<BigInt>
): PaidTicketsRefundedAndBurned {
  let paidTicketsRefundedAndBurnedEvent = changetype<
    PaidTicketsRefundedAndBurned
  >(newMockEvent());

  paidTicketsRefundedAndBurnedEvent.parameters = new Array();

  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  );
  paidTicketsRefundedAndBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIdsOnNaffle",
      ethereum.Value.fromUnsignedBigIntArray(ticketIdsOnNaffle)
    )
  );

  return paidTicketsRefundedAndBurnedEvent;
}
