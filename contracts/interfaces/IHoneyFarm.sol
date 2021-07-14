// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC721.sol";

interface IHoneyFarm is IERC721 {
    event Referred(address indexed referrer, uint256 depositId);
    event RewardsWithdraw(uint256 indexed depositId, uint256 rewardAmount); 

    function createDeposit(IERC20 _poolToken, uint256 _amount, uint256 _unlockTime, address _referrer) external;
    function closeDeposit(uint256 _depositId) external;
    function withdrawRewards(uint256 _depositId) external;
}
