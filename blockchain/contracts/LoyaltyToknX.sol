// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LoyaltyToknX is ERC20, AccessControl {
    using SafeMath for uint256;

    uint256 public constant MAX_SUPPLY = 1000000;
    uint256 public lastMintTime;
    uint256 public constant MINT_INTERVAL = 1 days; // Rate limiting - 1 day
    
    constructor() ERC20("LoyaltyToknX", "LTX") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}