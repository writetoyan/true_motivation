// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import './TrueMotivator.sol';

/**
 * @title Factory contract 
 * @notice This contract is used to deploy and keep track of all the TrueMotivator contracts
 */
contract MotivatorFactory {

    TrueMotivator[] public trueMotivators;

    event TrueMotivatorCreated(address indexed trueMotivator);

    /**
     * @notice Function that deploy a TrueMotivator contract
     * @param _worstEnemy The address where the ethers will be send if the challenge failed
     * @param _motivatorJudge The address of the contract that will fetch the api to get the result of challenge
     */
    function createTrueMotivator(address _worstEnemy, address _motivatorJudge) external returns (bool trueMotivatorCreated) {
        TrueMotivator trueMotivator = new TrueMotivator(msg.sender, _worstEnemy, _motivatorJudge);
        trueMotivators.push(trueMotivator);
        emit TrueMotivatorCreated(address(trueMotivator));
        return trueMotivatorCreated;
    }
}