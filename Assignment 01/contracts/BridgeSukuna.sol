// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokenSukuna.sol";
contract BridgeSukuna {
    TokenSukuna public tokenSukuna;
    address public bridgeGojo;
    mapping(address => uint256) public deposits;
    event TokensDeposited(address indexed sender, uint256 amount);
    event TokensWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _tokenSukuna) {
        tokenSukuna = TokenSukuna(_tokenSukuna);
    }
    
    function setBridgeGojo(address _bridgeGojo) external {
        bridgeGojo = _bridgeGojo;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(tokenSukuna.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        deposits[msg.sender] += amount;

        emit TokensDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(bridgeGojo != address(0), "BridgeBSC address not set");
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        deposits[msg.sender] -= amount;
        require(tokenSukuna.transfer(msg.sender, amount), "Transfer failed");

        emit TokensWithdrawn(msg.sender, amount);
    }
}
