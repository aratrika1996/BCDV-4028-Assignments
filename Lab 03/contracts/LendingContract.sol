// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingContract {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public borrowedAmounts;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Users can deposit assets into the contract
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
    }

    // Users can borrow assets up to a certain limit (based on their collateral)
    function borrow(uint256 amount) external {
        require(amount > 0, "Borrow amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        borrowedAmounts[msg.sender] += amount;
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Users can repay borrowed assets
    function repay() external payable {
        require(msg.value > 0, "Repayment amount must be greater than 0");
        uint256 borrowedAmount = borrowedAmounts[msg.sender];
        require(borrowedAmount > 0, "No borrowed amount to repay");

        if (msg.value >= borrowedAmount) {
            // Full repayment
            balances[msg.sender] += msg.value - borrowedAmount;
            borrowedAmounts[msg.sender] = 0;
        } else {
            // Partial repayment
            balances[msg.sender] += msg.value;
            borrowedAmounts[msg.sender] -= msg.value;
        }
    }
}
