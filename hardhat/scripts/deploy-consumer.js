import { ethers } from 'hardhat';

const oracleAddress = '0x649a2C205BE7A3d5e99206CEEFF30c794f0E31EC';

async function main() {
    console.log("Deploying consumer contract...")
    const ConsumerFactory = await ethers.getContractFactory('FunctionsConsumer');
    const consumerContract = await ConsumerFactory.deploy(oracleAddress);
    await consumerContract.deployed();
    console.log(`Consumer contract deployed at address ${consumerContract.address}`)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1;
})
