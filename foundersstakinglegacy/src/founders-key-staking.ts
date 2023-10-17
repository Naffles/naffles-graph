import {
  UserStaked as UserStakedEvent,
  UserUnstaked as UserUnstakedEvent
} from "../generated/FoundersKeyStaking/FoundersKeyStaking";
import { Stake } from "../generated/schema";
import { Bytes, store } from '@graphprotocol/graph-ts';

export function handleUserStaked(event: UserStakedEvent): void {
  let stake = new Stake(event.params.nftId.toString());
  stake.nftId = event.params.nftId;
  stake.stakingPeriod = event.params.stakingPeriod;
  stake.userAddress = event.params.userAddress;
  stake.save();
}

export function handleUserUnstaked(event: UserUnstakedEvent): void {
  store.remove("Stake", event.params.nftId.toString());
}
