import { BigNumberish, BytesLike, ethers } from "ethers";
import { AllowlistVoting } from "../client";
import { VoteAction } from "../interfaces";

export class AllowlistVotingEncoding {
  private allowlistVoting: AllowlistVoting;

  constructor(allowlistVoting: AllowlistVoting) {
    this.allowlistVoting = allowlistVoting;
  }

  private getUnsignedTransaction(
    functionName: string,
    ...args: any[]
  ): ethers.UnsignedTransaction {
    const pluginInstance = this.allowlistVoting.pluginInstance;
    const data = pluginInstance.interface.encodeFunctionData(
      // @ts-ignore functionName is hardcoded by us
      functionName,
      args
    );
    return {
      to: pluginInstance.address,
      value: 0,
      data,
    };
  }

  public addAllowedUsers(_users: string[]): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction("addAllowedUsers", _users);
  }

  public createVote(
    _proposalMetadata: BytesLike,
    _actions: VoteAction[],
    _startDate: BigNumberish,
    _endDate: BigNumberish,
    _executeIfDecided: boolean,
    _choice: BigNumberish
  ): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction(
      "createVote",
      _proposalMetadata,
      _actions,
      _startDate,
      _endDate,
      _executeIfDecided,
      _choice
    );
  }

  public execute(_voteId: BigNumberish): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction("execute", _voteId);
  }

  public removeAllowedUsers(_users: string[]): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction("removeAllowedUsers", _users);
  }

  public setConfiguration(
    _participationRequiredPct: BigNumberish,
    _supportRequiredPct: BigNumberish,
    _minDuration: BigNumberish
  ): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction(
      "setConfiguration",
      _participationRequiredPct,
      _supportRequiredPct,
      _minDuration
    );
  }

  public vote(
    _voteId: BigNumberish,
    _choice: BigNumberish,
    _executesIfDecided: boolean
  ): ethers.UnsignedTransaction {
    return this.getUnsignedTransaction(
      "vote",
      _voteId,
      _choice,
      _executesIfDecided
    );
  }
}