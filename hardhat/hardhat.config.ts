import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
require('./tasks/fund-subscription.js')

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: `${process.env.SEPOLIA_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;

