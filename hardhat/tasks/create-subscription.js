const functionsBillingRegistryProxy = '0x3c79f56407DCB9dc9b852D139a317246f43750Cc';
const registryAbi = [{
    "inputs": [],
    "name": "createSubscription",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },];


task('create-subscription', 'Create a new subscription')
    .setAction(async () => {
        console.log('Creating a subscription...')
        const registry = await ethers.getContractAt(registryAbi, functionsBillingRegistryProxy);
        const createSubscriptionTx = await registry.createSubscription()
        const createSubscriptionReceipt = await createSubscriptionTx.wait(1)
        console.log(createSubscriptionReceipt)
    })