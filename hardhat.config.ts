// hardhat.config.ts

import "dotenv/config"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-solhint"
import "@tenderly/hardhat-tenderly"
import "@nomiclabs/hardhat-waffle"
import "hardhat-abi-exporter"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import "hardhat-spdx-license-identifier"
import "hardhat-typechain"
import "hardhat-watcher"
import "solidity-coverage"
import "./tasks"
require("@nomiclabs/hardhat-truffle5");
require('@nomiclabs/hardhat-ethers');

import { HardhatUserConfig } from "hardhat/types"
import { removeConsoleLog } from "hardhat-preprocessor"

const accounts = {
  mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
  // accountsBalance: "990000000000000000000",
}

const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
  },
  mocha: {
    timeout: 20000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      // Default to 1
      default: 1,
      // dev address mainnet
      // 1: "",
    },
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      forking: {
        url: `https://rpc.polis.tech`,
      },
      accounts,
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    sparta: {
      url: `https://sparta-rpc.polis.tech`,
      accounts,
      chainId: 333888,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      gasMultiplier: 2,
      timeout: 100000
    },
    olympus: {
      url: `https://rpc.polis.tech`,
      accounts,
      chainId: 333999,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
      timeout: 100000
    },
    fantom: {
      url: "https://rpcapi.fantom.network",
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
      gasPrice: 22000000000,
    },
    "fantom-testnet": {
      url: "https://rpc.testnet.fantom.network",
      accounts,
      chainId: 4002,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    xdai: {
      url: "https://rpc.xdaichain.com",
      accounts,
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      accounts,
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    okex: {
      url: "https://exchainrpc.okex.org",
      accounts,
      chainId: 66,
      live: true,
      saveDeployments: true,
    },
    "okex-testnet": {
      url: "https://exchaintestrpc.okex.org",
      accounts,
      chainId: 65,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    }
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => bre.network.name !== "hardhat" && bre.network.name !== "localhost"),
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT!,
    username: process.env.TENDERLY_USERNAME!,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
}

export default config
