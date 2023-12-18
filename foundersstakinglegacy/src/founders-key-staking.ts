import {
  UserStaked as UserStakedEvent,
  UserUnstaked as UserUnstakedEvent
} from "../generated/FoundersKeyStaking/FoundersKeyStaking";
import { Stake, StakeHistory, StakeSession} from "../generated/schema";
import { store } from '@graphprotocol/graph-ts';

export function handleUserStakedLegacy(event: UserStakedEvent): void {
  let stake = new Stake(event.params.nftId.toString());
  stake.nftId = event.params.nftId;
  stake.stakingPeriod = event.params.stakingPeriod;
  stake.userAddress = event.params.userAddress;
  stake.save();
  
  handleUserStaked(event); 
}

export function handleUserUnstakedLegacy(event: UserUnstakedEvent): void {
  store.remove("Stake", event.params.nftId.toString());
  _handleUnstaked(event);
}

export function handleUserStaked(event: UserStakedEvent): void {
  _handleStaked(event);
}

export function handleUserUnstaked(event: UserUnstakedEvent): void {
  _handleUnstaked(event); 
}

function _handleUnstaked(event: UserUnstakedEvent): void {
  let id = event.params.nftId.toString() + "-" + event.params.userAddress.toHex();
  let stakeHistory = StakeHistory.load(id);
  if (stakeHistory == null) {
    return;
  }

  const lastId = stakeHistory.stakeSessionIds.at(stakeHistory.stakeSessionIds.length - 1)
  const stakeSession = StakeSession.load(lastId);
  if (stakeSession== null) {
    return;
  }
  if (stakeSession.unstakedAt === null) {
    stakeSession.unstakedAt = event.block.timestamp;
    stakeSession.save();
  }
}

function _handleStaked(event: UserStakedEvent): void {
  let stakeHistoryId = event.params.nftId.toString() + "-" + event.params.userAddress.toHex();
  
  // load the StakeHistory entity for this NFT and user
  let stakeHistory = StakeHistory.load(stakeHistoryId);
  if (stakeHistory == null) {
      stakeHistory = new StakeHistory(stakeHistoryId);
      stakeHistory.nftId = event.params.nftId;
      stakeHistory.staker = event.params.userAddress;
      stakeHistory.stakeSessionIds = []; 
      stakeHistory.save();
  }
  

  const stakeSessionId = event.params.userAddress.toHex() + "-" + event.params.nftId.toString() + "-" + event.block.timestamp.toHex();
  const stakeSession = new StakeSession(stakeSessionId);
  stakeSession.stakeHistory = stakeHistoryId;
  stakeSession.stakedAt = event.block.timestamp;
  stakeSession.unstakedAt = null;
  stakeSession.stakingPeriod = event.params.stakingPeriod;
  stakeSession.save();

  let stakeSessions = stakeHistory.stakeSessionIds;
  stakeSessions.push(stakeSessionId);
  stakeHistory.stakeSessionIds = stakeSessions;
  stakeHistory.save();

}
