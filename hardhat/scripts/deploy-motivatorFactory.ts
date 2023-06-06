import { ethers } from 'hardhat'

async function main() {
    const motivatorFactoryFactory = await ethers.getContractFactory('MotivatorFactory');
    const motivatorFactoryContract = await motivatorFactoryFactory.deploy();
    await motivatorFactoryContract.deployed();
    console.log(`Contract deployed at address ${motivatorFactoryContract.address}`)
}


main().catch((error) => {
    console.error(error) 
    process.exitCode = 1;
})