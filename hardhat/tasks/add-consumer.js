const functionsBillingRegistryProxy = '0x3c79f56407DCB9dc9b852D139a317246f43750Cc';
const registryAbi = [
    {
        "inputs": [
          {
            "internalType": "uint64",
            "name": "subscriptionId",
            "type": "uint64"
          },
          {
            "internalType": "address",
            "name": "consumer",
            "type": "address"
          }
        ],
        "name": "addConsumer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
]

task('add-consumer', 'adding a consumer to the subscription')
    .addParam('consumer', 'the consumer contract address')
    .addParam('subid', 'the ID of the subscription')
    .setAction(async (taskArgs) => {
        const consumerAddress = taskArgs.consumer;
        const subid = taskArgs.subid;
        console.log(`Adding consumer ${consumerAddress} to subscription ID ${subid}`)
        const registry = await ethers.getContractAt(registryAbi, functionsBillingRegistryProxy);
        const addConsumerTx = await registry.addConsumer(subid, consumerAddress);
        await addConsumerTx.wait();
    })