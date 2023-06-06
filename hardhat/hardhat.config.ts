import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
require('./tasks/add-consumer.js')
require('./tasks/fund-subscription.js')

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18"
      },
      {
        version: "0.8.7",

      },
      {
        version: "0.7.0",
  
      },
      {
        version: "0.6.6",
      
      },
      {
        version: "0.4.24",
     
      },
    ],
  },
  networks: {
    sepolia: {
      url: `${process.env.SEPOLIA_RPC_URL}`,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;

