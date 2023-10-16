import {
  UserStaked as UserStakedEvent,
  UserUnstaked as UserUnstakedEvent
} from "../generated/FoundersKeyStaking/FoundersKeyStaking";
import { Stake } from "../generated/schema";
import { Bytes, store } from '@graphprotocol/graph-ts';

export function handleUserStaked(event: UserStakedEvent): void {
  let userAddress = event.params.userAddress;
  let stakeId = userAddress.toHex().concat("-").concat(event.params.nftId.toString());
  let stake = new Stake(Bytes.fromHexString(stakeId));
  stake.nftId = event.params.nftId;
  stake.stakingPeriod = event.params.stakingPeriod;
  stake.save();
}

export function handleUserUnstaked(event: UserUnstakedEvent): void {
  let stakeId = event.params.userAddress.toHex().concat("-").concat(event.params.nftId.toString());
  store.remove("Stake", stakeId);
}
