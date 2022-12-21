// This file contains the definitions of the AddressList DAO client

import { IMajorityVoting } from "@aragon/core-contracts-ethers";
import { BigNumberish } from "@ethersproject/bignumber";
import {
  ContractVotingSettings,
  DaoAction,
  ExecuteProposalStepValue,
  GasFeeEstimation,
  ICanVoteParams,
  IClientCore,
  ICreateProposalParams,
  IExecuteProposalParams,
  IInterfaceParams,
  IProposalQueryParams,
  IProposalSettings,
  IVoteProposalParams,
  ProposalBase,
  ProposalCreationStepValue,
  ProposalListItemBase,
  ProposalMetadata,
  SubgraphAction,
  SubgraphProposalBase,
  SubgraphVoterListItemBase,
  VoteProposalStepValue,
  VoteValues,
  VotingMode,
  VotingSettings,
} from "../client-common";

// Address List
export interface IClientAddressListMethods extends IClientCore {
  createProposal: (
    params: ICreateProposalParams,
  ) => AsyncGenerator<ProposalCreationStepValue>;
  pinMetadata: (params: ProposalMetadata) => Promise<string>;
  voteProposal: (
    params: IVoteProposalParams,
  ) => AsyncGenerator<VoteProposalStepValue>;
  executeProposal: (
    params: IExecuteProposalParams,
  ) => AsyncGenerator<ExecuteProposalStepValue>;
  canVote: (params: ICanVoteParams) => Promise<boolean>;
  getMembers: (addressOrEns: string) => Promise<string[]>;
  getProposal: (propoosalId: string) => Promise<AddressListProposal | null>;
  getProposals: (
    params: IProposalQueryParams,
  ) => Promise<AddressListProposalListItem[]>;
  getSettings: (pluginAddress: string) => Promise<VotingSettings | null>;
}

export interface IClientAddressListEncoding extends IClientCore {
  updateVotingSettingsAction: (
    pluginAddress: string,
    params: VotingSettings,
  ) => DaoAction;
  addMembersAction: (
    pluginAddress: string,
    members: string[],
  ) => DaoAction;
  removeMembersAction: (
    pluginAddress: string,
    members: string[],
  ) => DaoAction;
}
export interface IClientAddressListDecoding extends IClientCore {
  updateVotingSettingsAction: (data: Uint8Array) => VotingSettings;
  addMembersAction: (data: Uint8Array) => string[];
  removeMembersAction: (data: Uint8Array) => string[];
  findInterface: (data: Uint8Array) => IInterfaceParams | null;
}
export interface IClientAddressListEstimation extends IClientCore {
  createProposal: (
    params: ICreateProposalParams,
  ) => Promise<GasFeeEstimation>;
  voteProposal: (params: IVoteProposalParams) => Promise<GasFeeEstimation>;
  executeProposal: (
    params: IExecuteProposalParams,
  ) => Promise<GasFeeEstimation>;
}
/** Defines the shape of the AddressList client class */
export interface IClientAddressList {
  methods: IClientAddressListMethods;
  encoding: IClientAddressListEncoding;
  decoding: IClientAddressListDecoding;
  estimation: IClientAddressListEstimation;
}

export type AddressListProposal = ProposalBase & {
  result: AddressListProposalResult;
  settings: IProposalSettings;
  votes: Array<{ address: string; vote: VoteValues }>;
  totalVotingWeight: number;
};

export type AddressListProposalListItem = ProposalListItemBase & {
  result: AddressListProposalResult;
};
export type AddressListProposalResult = {
  yes: number;
  no: number;
  abstain: number;
};

export type SubgraphAddressListVoterListItem = SubgraphVoterListItemBase;

export type SubgraphAddressListProposalListItem = SubgraphProposalBase;
export type SubgraphAddressListProposal = SubgraphProposalBase & {
  createdAt: string;
  actions: SubgraphAction[];
  totalSupportThresholdPct: string;
  relativeSupportThresholdPct: string;
  voters: SubgraphAddressListVoterListItem[];
  census: string;
};

export type ContractAddressListInitParams = [
  ContractVotingSettings,
  string[],
];

export type IAddressListPluginInstall = {
  addresses: string[];
  votingSettings: VotingSettings;
};
