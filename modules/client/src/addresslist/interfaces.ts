interface IAddresslist {
  pluginAddress: string;
}

export interface IAddresslistContextParams extends IAddresslist {}

export interface IAddresslistContextPluginState extends IAddresslist {}

export interface ProposalAction {
  to: string;
  value: bigint;
  data: Uint8Array;
}

export interface Proposal {
  id: number;
  open: boolean;
  executed: boolean;
  startDate: number;
  endDate: number;
  snapshotBlock: bigint;
  supportRequired: bigint;
  participationRequired: bigint;
  votingPower: bigint;
  yes: bigint;
  no: bigint;
  abstain: bigint;
  actions: ProposalAction[];
}

export enum Steps {
  PENDING = "pending",
  DONE = "done",
}

export type VoteStepsValue = VoteStepsValuePending | VoteStepsValueDone;

export type VoteStepsValuePending = {
  key: Steps.PENDING;
  txHash: string;
};

export type VoteStepsValueDone = {
  key: Steps.DONE;
};

export type ProposalCreationValueDone = VoteStepsValueDone & {
  proposalId: number;
};

export type ProposalCreationValue =
  | VoteStepsValuePending
  | ProposalCreationValueDone;

export interface ICreateProposalParams {
  pluginAddr: string;
  _proposalMetadata: Uint8Array;
  _actions: ProposalAction[];
  _startDate: number;
  _endDate: number;
  _executeIfDecided: boolean;
  _choice: number;
}

export interface ISetConfigurationParamsDecoded {
  _participationRequiredPct: number;
  _supportRequiredPct: number;
  _minDuration: number;
}

export interface ISetConfigurationParams
  extends ISetConfigurationParamsDecoded {
  pluginAddr: string;
}

export interface IVoteParamsDecoded {
  _proposalId: number;
  _choice: number;
  _executesIfDecided: boolean;
}

export interface IVoteParams extends IVoteParamsDecoded {
  pluginAddr: string;
}

export enum Permissions {
  MODIFY_ALLOWLIST_PERMISSION = "MODIFY_ALLOWLIST_PERMISSION",
  SET_CONFIGURATION_PERMISSION = "SET_CONFIGURATION_PERMISSION",
  UPGRADE_PLUGIN_PERMISSION = "UPGRADE_PLUGIN_PERMISSION",
}
