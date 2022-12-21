import { bytesToHex, UnexpectedActionError } from "@aragon/sdk-common";
import {
  ClientCore,
  ContextPlugin,
  decodeUpdateVotingSettingsAction,
  getFunctionFragment,
  IInterfaceParams,
  VotingSettings,
} from "../../../client-common";
import { AVAILABLE_FUNCTION_SIGNATURES } from "../constants";
import { IClientErc20Decoding, IMintTokenParams } from "../../interfaces";
import { IERC20MintableUpgradeable__factory } from "@aragon/core-contracts-ethers";
import { mintTokenParamsFromContract } from "../utils";

/**
 * Decoding module the SDK ERC20 Client
 */
export class ClientErc20Decoding extends ClientCore
  implements IClientErc20Decoding {
  constructor(context: ContextPlugin) {
    super(context);
    Object.freeze(ClientErc20Decoding.prototype);
    Object.freeze(this);
  }
  /**
   * Decodes a dao metadata from an encoded update metadata action
   *
   * @param {Uint8Array} data
   * @return {*}  {VotingSettings}
   * @memberof ClientErc20Decoding
   */
  public updateVotingSettingsAction(data: Uint8Array): VotingSettings {
    return decodeUpdateVotingSettingsAction(data);
  }
  /**
   * Decodes the mint token params from an encoded mint token action
   *
   * @param {Uint8Array} data
   * @return {*}  {IMintTokenParams}
   * @memberof ClientErc20Decoding
   */
  public mintTokenAction(data: Uint8Array): IMintTokenParams {
    const votingInterface = IERC20MintableUpgradeable__factory
      .createInterface();
    const hexBytes = bytesToHex(data, true);
    const receivedFunction = votingInterface.getFunction(
      hexBytes.substring(0, 10) as any,
    );
    const expectedfunction = votingInterface.getFunction("mint");
    if (receivedFunction.name !== expectedfunction.name) {
      throw new UnexpectedActionError();
    }
    const result = votingInterface.decodeFunctionData("mint", data);
    return mintTokenParamsFromContract(result);
  }
  /**
   * Returns the decoded function info given the encoded data of an action
   *
   * @param {Uint8Array} data
   * @return {*}  {(IInterfaceParams | null)}
   * @memberof ClientErc20Decoding
   */
  public findInterface(data: Uint8Array): IInterfaceParams | null {
    try {
      const func = getFunctionFragment(data, AVAILABLE_FUNCTION_SIGNATURES);
      return {
        id: func.format("minimal"),
        functionName: func.name,
        hash: bytesToHex(data, true).substring(0, 10),
      };
    } catch {
      return null;
    }
  }
}
