# TRUE MOTIVATION PROJECT

## Abstract

True Motivation is a project aimed at helping people to get their personnal challenges done. It leverage the blockchain technology to motivate a "brave" person to finish what he started and not report it to later or abandon it in the middle. 

## How it works

To maximize a person motivation we do not promise any rewards at the end, but we leverage the loss of his personnal money to motivate him. The fact that a loss have a greater impact on people's decision to act, is a great mean to encourage ones. 

Once a person decided that he needed to learn something new, loss weight or stop smoking for exemple, he can create a TrueMotivator contract and lock some funds on it. 

His friends and relatives can also send some "tips" to the Motivator contract to motivate him more to achieve what he started. 

Then they can likes or dislikes how he executed his challenge. Those votes are stored on our dabase. To calculate the result and pass it to the smart contract that will liberate the funds locked to it, he should have more likes than dislikes.
We leverage the new Chainlink Functions to calculate the result fetching the votes from an API, store it on-chain and execute the decision. 

If he succeeded, the funds are send to his wallet address. If despite of that motivator, he failed at executed what he wanted, the funds will be sent to the wallet of his worst enemy.

## The stack 

- Chainlink Functions
- Solidity
- Hardhat
- Next.js
- MongoDB

## Smart contracts

There is three smart contracts that power this project.

- Motivator Factory Contract 
- True Motivator Contract
- Motivator Judge Contract

The Motivator Factory contract is used to deploy and keep track of all the True Motivator contracts that will be deployed. Each True Motivator contract represent a unique challenge, task that a person wants to accomplish.

The True Motivator contract stores the funds that will motivate the person to finish what he started. This contract call the result on the Motivator Judge contract and liberate the funds if the person successfully achieved his task. Or send the fund to his worst enemy if the challenge was a failure. 

The Motivator Judge is the consumer contract from Chainlink Functions that will request the fetching of the different votes from our API, calculate the result honestly and bring that result on-chain. 

### Homepage 

![Homepage](/assets/Homepage.png "Homepage")

### Create a True Motivator contract

![Create](/assets/Create.png "Create")

### Lock fund to motivate you 

![Fund](/assets/Fund.png "Fund")

### Friends and family votes  

![Vote](/assets/Vote.png "Vote")

### Fetching the votes, calculating the result and get it on-chain 

![Judge](/assets/Judge.png "Judge")

