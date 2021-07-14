pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./interfaces/IHoneyFarm.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";
import "./lib/SafeMath.sol";

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract CVault {

  using SafeMath for uint256;

  address public HoneyFarm;
  address public UniRouter;
  address public CombToken;
  address public PairToken;


  constructor(
    address _farm,
    address _router,
    address _comb,
    address _pair
  ) {
    HoneyFarm = _farm;
    UniRouter = _router;
    CombToken = _comb;
    PairToken = _pair;
  }

  function swapHalfComb() external {
      // Get half the Comb amount
      uint combBalance = IERC20(CombToken).balanceOf(address(this));

      uint pairBalance = IERC20(PairToken).balanceOf(address(this));

      uint combToSwap = combBalance.div(2);
      // Approve the HoneySwap Router on the borrowed asset
      IERC20(CombToken).approve(UniRouter, combToSwap);

      // Execute trade on HoneySwap
      address[] memory path = new address[](2);
      path[0] = CombToken;
      path[1] = PairToken;

      uint[] memory amounts = IUniswapV2Router02(UniRouter).swapExactTokensForTokens(combToSwap, 0, path, address(this), block.timestamp + 30);

  }

  function addLiquidity() public {
    // how much comb token does the contract have
    uint combAmount = IERC20(CombToken).balanceOf(address(this));
    uint pairAmount = IERC20(PairToken).balanceOf(address(this));

    IERC20(CombToken).approve(UniRouter, combAmount);
    IERC20(PairToken).approve(UniRouter, pairAmount);

    IUniswapV2Router02(UniRouter).addLiquidity(
      CombToken,
      PairToken,
      combAmount,
      pairAmount,
      combAmount * 99 / 100,
      pairAmount * 99 / 100,
      address(this),
      block.timestamp + 1
    );
  }
}
