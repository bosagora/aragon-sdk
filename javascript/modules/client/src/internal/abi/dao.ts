import {
  ContractInterface,
  ContractTransaction,
} from "@ethersproject/contracts";

export const exampleContractAbi: ContractInterface = [
  {
    "inputs": [
      {
        "internalType": "contract Registry",
        "name": "_registry",
        "type": "address"
      },
      {
        "internalType": "contract TokenFactory",
        "name": "_tokenFactory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voting",
        "type": "address"
      }
    ],
    "name": "DAOCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "daoBase",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "bytes",
            "name": "metadata",
            "type": "bytes"
          }
        ],
        "internalType": "struct DAOFactory.DAOConfig",
        "name": "_daoConfig",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          }
        ],
        "internalType": "struct TokenFactory.TokenConfig",
        "name": "_tokenConfig",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "address[]",
            "name": "receivers",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct TokenFactory.MintConfig",
        "name": "_mintConfig",
        "type": "tuple"
      },
      {
        "internalType": "uint256[3]",
        "name": "_votingSettings",
        "type": "uint256[3]"
      },
      {
        "internalType": "address",
        "name": "_gsnForwarder",
        "type": "address"
      }
    ],
    "name": "newDAO",
    "outputs": [
      {
        "internalType": "contract DAO",
        "name": "dao",
        "type": "address"
      },
      {
        "internalType": "contract ERC20Voting",
        "name": "voting",
        "type": "address"
      },
      {
        "internalType": "contract ERC20VotesUpgradeable",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "contract MerkleMinter",
        "name": "minter",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registry",
    "outputs": [
      {
        "internalType": "contract Registry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenFactory",
    "outputs": [
      {
        "internalType": "contract TokenFactory",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingBase",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export type ExampleContractMethods = {
  retrieve: () => Promise<string>;
  store: (hexData: string) => Promise<ContractTransaction>;
};
