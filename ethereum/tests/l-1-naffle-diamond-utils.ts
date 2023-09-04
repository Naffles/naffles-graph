import { newMockEvent } from "matchstick-as";
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts";
import {
  DiamondCut,
  L1NaffleCancelled,
  L1NaffleCreated,
  L1NaffleWinnerSet,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../generated/L1NaffleDiamond/L1NaffleDiamond";
import {
  ChainlinkRequestFulfilled,
  NaffleWinnerRolled,
} from "../generated/NaffleVRF/NaffleVRF";

export function createChainlinkRequestFulfilledEvent(
  requestId: BigInt,
  naffleId: BigInt,
  winningNumber: BigInt
): ChainlinkRequestFulfilled {
  let chainlinkRequestFulfilledEvent = changetype<ChainlinkRequestFulfilled>(
    newMockEvent()
  );

  chainlinkRequestFulfilledEvent.parameters = new Array();

  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  );
  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  chainlinkRequestFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "winningNumber",
      ethereum.Value.fromUnsignedBigInt(winningNumber)
    )
  );

  return chainlinkRequestFulfilledEvent;
}

export function createNaffleWinnerRolledEvent(
  naffleId: BigInt
): NaffleWinnerRolled {
  let naffleWinnerRolledEvent = changetype<NaffleWinnerRolled>(newMockEvent());

  naffleWinnerRolledEvent.parameters = new Array();

  naffleWinnerRolledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );

  return naffleWinnerRolledEvent;
}

export function createDiamondCutEvent(
  facetCuts: Array<ethereum.Tuple>,
  target: Address,
  data: Bytes
): DiamondCut {
  let diamondCutEvent = changetype<DiamondCut>(newMockEvent());

  diamondCutEvent.parameters = new Array();

  diamondCutEvent.parameters.push(
    new ethereum.EventParam(
      "facetCuts",
      ethereum.Value.fromTupleArray(facetCuts)
    )
  );
  diamondCutEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  );
  diamondCutEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  );

  return diamondCutEvent;
}

export function createL1NaffleCancelledEvent(
  naffleId: BigInt
): L1NaffleCancelled {
  let l1NaffleCancelledEvent = changetype<L1NaffleCancelled>(newMockEvent());

  l1NaffleCancelledEvent.parameters = new Array();

  l1NaffleCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );

  return l1NaffleCancelledEvent;
}

export function createL1NaffleCreatedEvent(
  naffleId: BigInt,
  owner: Address,
  ethTokenAddress: Address,
  nftId: BigInt,
  paidTicketSpots: BigInt,
  ticketPriceInWei: BigInt,
  endTime: BigInt,
  naffleType: i32,
  tokenContractType: i32
): L1NaffleCreated {
  let l1NaffleCreatedEvent = changetype<L1NaffleCreated>(newMockEvent());

  l1NaffleCreatedEvent.parameters = new Array();

  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ethTokenAddress",
      ethereum.Value.fromAddress(ethTokenAddress)
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "paidTicketSpots",
      ethereum.Value.fromUnsignedBigInt(paidTicketSpots)
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketPriceInWei",
      ethereum.Value.fromUnsignedBigInt(ticketPriceInWei)
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "naffleType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(naffleType))
    )
  );
  l1NaffleCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tokenContractType))
    )
  );

  return l1NaffleCreatedEvent;
}

export function createL1NaffleWinnerSetEvent(
  naffleId: BigInt,
  winner: Address
): L1NaffleWinnerSet {
  let l1NaffleWinnerSetEvent = changetype<L1NaffleWinnerSet>(newMockEvent());

  l1NaffleWinnerSetEvent.parameters = new Array();

  l1NaffleWinnerSetEvent.parameters.push(
    new ethereum.EventParam(
      "naffleId",
      ethereum.Value.fromUnsignedBigInt(naffleId)
    )
  );
  l1NaffleWinnerSetEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  );

  return l1NaffleWinnerSetEvent;
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
