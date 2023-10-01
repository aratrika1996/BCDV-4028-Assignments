// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokenGojo.sol";
contract BridgeGojo {
    TokenGojo public tokenGojo;
    address public bridgeSukuna;
    mapping(address => uint256) public deposits;
    event TokensDeposited(address indexed sender, uint256 amount);
    event TokensWithdrawn(address indexed recipient, uint256 amount);
    constructor(address _tokenGojo) {
        tokenGojo = TokenGojo(_tokenGojo);
    }
    function setBridgeSukuna(address _bridgeSukuna) external {
        bridgeSukuna = _bridgeSukuna;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(tokenGojo.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        deposits[msg.sender] += amount;

        emit TokensDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(bridgeSukuna != address(0), "BridgeBSC address not set");
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        deposits[msg.sender] -= amount;
        require(tokenGojo.transfer(msg.sender, amount), "Transfer failed");

        emit TokensWithdrawn(msg.sender, amount);
    }
}
