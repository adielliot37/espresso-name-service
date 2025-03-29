# ☕ Espresso Name Service (ENS)

> A decentralized username and payment identity system built on top of a custom **Espresso Rollup** (Arbitrum Orbit L2). Register your `.esp` name, update it, or receive payments using usernames.

---

## 🚀 Project Overview

Espresso Name Service (ENS) lets users register human-readable usernames like `aditya.esp`, which map to their wallet address on a custom EVM-compatible rollup.

### Features
- ✅ Register `.esp` names (e.g., `coffee.esp`)
- 🔁 Update associated wallet address
- 💸 Receive ETH by name (e.g., send to `aditya.esp`)
- 🌐 Built with Next.js, MongoDB, Ethers.js, Reown AppKit, Wagmi v2
- ⚡ Deployed on a custom **Espresso Rollup** using Arbitrum Nitro

---

## ⚙️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | Next.js (pages directory)     |
| Wallet UI   | Reown AppKit (RainbowKit)     |
| EVM SDK     | wagmi v2, viem                |
| Blockchain  | Espresso Rollup (Arbitrum Orbit) |
| DB          | MongoDB Atlas (via Mongoose)  |
| Deployment  | Vercel                        |

---

## 🔗 Espresso Rollup Configuration



| Parameter       | Value                              |
|----------------|-------------------------------------|
| Chain Name     | Espresso Rollup                     |
| Chain ID       | `6969`                              |
| RPC URL        | `http://167.71.238.55:8547`         |


---

##  Deployed Espresso Rollup Contracts

| Contract Name             | Address                                      |
|---------------------------|----------------------------------------------|
| EthBridge                | `0x5562E69F4bf7255D79AC591Ce2D98083bc362577` |
| EthSequencerInbox        | `0xa2E4F9f193bd36eFee930D064029B007661F4267` |
| EthInbox                 | `0x86BD6277E628A2A238720593B9A2d636392d3F7a` |
| EthRollupEventInbox      | `0x1C6E771277321ef4DF9A5f12CffD1dfeC4582F6F` |
| EthOutbox                | `0x479956Bc9f24A0B2edcBc4DaE88A8763c4C2D9Ab` |
| ERC20Bridge              | `0x359d172ABdf29795dde530FF5af02E7a810F5e02` |
| ERC20SequencerInbox      | `0x84ed26BC1200c8068d06d63A852131103547c87a` |
| ERC20Inbox               | `0x8Db4A33103E478217B29b7520ed49ACE7626B0F0` |
| ERC20RollupEventInbox    | `0x3982751678FeC0f3bb665D97244aeA2970914D8d` |
| ERC20Outbox              | `0x130bBe22D08dd793CEF1e53F65d4a80C309C5694` |
| BridgeCreator            | `0x5562E69F4bf7255D79AC591Ce2D98083bc362577` |
| OneStepProver0           | `0x485d13362615EC3959AD7f996232cC9026bd910d` |
| OneStepProverMemory      | `0x8307835772C0d3dB403539B9F850A1770Be22BcD` |
| OneStepProverMath        | `0xdFf947b9b01d2882357C8524Eea78BDb289a2255` |
| OneStepProverHostIo      | `0x003513e346cB23332aC28BbeA5162ef4f11eE6B3` |
| OneStepProofEntry        | `0x21F96E0A0E91f14516A3a0EC50f303961e3441d7` |
| ChallengeManager         | `0xF7316AF5D5be4da7C92D52467756Ff7735162849` |
| RollupAdminLogic         | `0x4Cca0Aa6F3623d4eB5bC4C3F8375125FfeC15718` |
| RollupUserLogic          | `0x36eEC4913359EB3AFcD72FD05B73495f54414b3A` |
| UpgradeExecutor          | `0x971c9358F1ed4202b475d64A204d57cb2039e304` |
| ValidatorUtils           | `0xE774fba17DE29A4781Cb025D561148139781Ee5b` |
| ValidatorWalletCreator   | `0xB7cd7D0D977AC2461bfF9a2Edb6C8d58c6592Cc1` |
| RollupCreator            | `0x790d89E324381Cf5f2Fd61fe57243D2Bef35dAa7` |
| DeployHelper             | `0xE0A00781B6EFe5f2e7db7f30CDbddcbFC6B9e341` |

---

##  Proxy Contracts on Espresso Rollup

| Contract Name             | Address                                      |
|---------------------------|----------------------------------------------|
| Inbox (proxy)             | `0x2C70326658F871446A3f36b8F0466c1Ac9853167` |
| Outbox (proxy)            | `0x32066E597B97552D129Ab46A6c62Ce7464E3CdD1` |
| RollupEventInbox (proxy)  | `0xFE6411397E12a854115fCE4793C7CB3b4eC4C16b` |
| ChallengeManager (proxy)  | `0x6a7f694B5A49d81C938D75f988DD49BCB8456f6c` |
| AdminProxy                | `0x198b0b552136963A36B60277B7E189A470C75B2D` |
| SequencerInbox (proxy)    | `0xA9EFfCe95960fdb05bCA25af894547d81e19590A` |
| Bridge (proxy)            | `0x1B722c36Bfc3d228620d90C3333d278F3bFa5423` |
| ValidatorUtils            | `0xE774fba17DE29A4781Cb025D561148139781Ee5b` |
| ValidatorWalletCreator    | `0xB7cd7D0D977AC2461bfF9a2Edb6C8d58c6592Cc1` |

>  All deployed at block number: `136005921`
## CreateRollup Transaction Hash: 0x89ccb8b663f66e21965622c8b03f84e970906dbe849057400e7d7d4d872fd30a

RollupProxy at 0x36F17a94501d3a6418C26bD0a9dC511715412378

espRegistry Contract Deployed at - 0xdFf947b9b01d2882357C8524Eea78BDb289a2255

## 💡 Smart Contract: `espRegistry.sol`

```solidity
string public constant NAME_SUFFIX = ".esp";

mapping(string => address) public nameToAddress;
mapping(string => address) public ownerOfName;

function registerName(string calldata name) external payable;
function updateNameAddress(string calldata name, address newAddress) external;
function payToName(string calldata fullName) external payable;
