// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import './MotivatorJudge.sol';

error ComeOnSendTheRightAmountToMotivateYou();
error TransferFailed();
error YouCannotChangeTheMotivatorJudge();

/**
 * @title TrueMotivator contract
 * @notice Contract used as a motivator for a challenge
 * @notice Funds are blocked until the result of a challenge is called
 */
contract TrueMotivator {

    address private bravePerson;
    address private worstEnemy;
    address private motivatorJudge;

    event FundLocked(uint256 indexed amount);
    event DecisionCalled(bytes indexed decision);
    event MoneySent(address indexed receiver, uint256 amount);
    event MotivatorJudgeChanged(address indexed newJudge);

    /**
     * 
     * @param _bravePerson The address of the person needed to be motivated
     * @param _worstEnemy The address where the funds will be sent if the challenge failed
     * @param _motivatorJudge The address of the contract that is used to fetch the result of a challenge from an api
     */
    constructor(address _bravePerson, address _worstEnemy, address _motivatorJudge) {
        bravePerson = _bravePerson;
        worstEnemy = _worstEnemy;
        motivatorJudge = _motivatorJudge;
    }

    /**
     * @notice Function used to lock ethers in the contract until a challenge is completed
     * @notice Friends and relatives can also lock funds to help the brave person to have more motivation
     * @param _motivatorAmount The amount to be locked
     */
    function motivateMe(uint256 _motivatorAmount) external payable {
        if (msg.value < _motivatorAmount) {
            revert ComeOnSendTheRightAmountToMotivateYou();
        }
        emit FundLocked(msg.value);
    }

    /**
     * @notice Function that will get the result of a challenge from the MotivatorJudge contract
     * @notice Funds will be send back to the owner if the challenge is successful otherwise it will be sent to his worst enemy
     * @dev The result of the call will be compared to the corresponding hash to apply the decision
     */
    function getJudgeDecision() external {
        bytes memory decision = MotivatorJudge(motivatorJudge).latestResponse();
        bytes32 hash = keccak256(decision);
        if (hash == 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6) {
            sendMoney(bravePerson);
        }
        if(hash == 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563) {
            sendMoney(worstEnemy);
        }
        emit DecisionCalled(decision);
    }

    /**
     * @notice Function to update the contract that will fetch the results from an api
     * @param _newMotivatorJudge The address of the new MotivatorJudge contract
     * @dev only the owner of this contract can change the address of the MotivatorJudge contract
     */
    function changeMotivatorjudge(address _newMotivatorJudge) external {
        if(msg.sender != bravePerson) {
            revert YouCannotChangeTheMotivatorJudge();
        }
        motivatorJudge = _newMotivatorJudge;
        emit MotivatorJudgeChanged(_newMotivatorJudge);
    }

    /**
     * @notice Getter that return the address of the brave person that created that motivator
     */
    function getBravePerson() external view returns (address) {
        return bravePerson;
    }

    /**
     * @notice Function that is called to apply the result of the challenge
     * @param receiver The address of the person that will receive the funds after the results are called
     */
    function sendMoney(address receiver) internal {
        (bool success, ) = payable(receiver).call{value: address(this).balance}("");
        if (!success) {
            revert TransferFailed();
        }
        emit MoneySent(receiver, address(this).balance);
    }
}