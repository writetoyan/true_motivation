const functionsBillingRegistryProxy = '0x3c79f56407DCB9dc9b852D139a317246f43750Cc'
const linkToken = '0x779877A7B0D9E8603169DdbD7836e478b4624789';
const linkAbi = [  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "transferAndCall",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },];

task('fund-subscription', 'Fund a subscription')
    .addParam('amount', 'amount of link to fund subscription')
    .addParam('subid', 'subscription ID to fund')
    .setAction(async (taskArgs) => {
        const amount = taskArgs.amount;
        const subId = taskArgs.subid;
        console.log(`Funding ${amount} LINK to subscription Id ${subId}...`)
        const linkContract = await ethers.getContractAt(linkAbi, linkToken);
        const fundSubscriptionTx = await linkContract.transferAndCall(
            functionsBillingRegistryProxy, 
            ethers.utils.parseEther(amount),
            ethers.utils.defaultAbiCoder.encode(["uint64"], [subId])
    )
    const fundSubscriptionReceipt = await fundSubscriptionTx.wait(1)
    console.log(fundSubscriptionReceipt)
    })