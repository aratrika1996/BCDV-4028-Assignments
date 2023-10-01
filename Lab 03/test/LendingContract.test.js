const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  let lendingContract;
  const owner = accounts[0];
  const user1 = accounts[1];

  beforeEach(async () => {
    lendingContract = await LendingContract.new({ from: owner });
  });

  it("should allow users to deposit assets", async () => {
    const depositAmount = web3.utils.toWei("1", "ether"); // Convert 1 ETH to Wei
    await lendingContract.deposit({ from: user1, value: depositAmount });
    const user1Balance = await lendingContract.balances(user1);
    assert.equal(Number(user1Balance), Number(depositAmount), "User1's balance is incorrect");
  });

  it("should allow users to borrow assets", async () => {
    const depositAmount = web3.utils.toWei("3", "ether"); // Convert 2 ETH to Wei
    await lendingContract.deposit({ from: user1, value: depositAmount });

    const borrowAmount = web3.utils.toWei("4", "ether"); // Convert 1 ETH to Wei
    await lendingContract.borrow(borrowAmount, { from: user1 });

    const user1Balance = await lendingContract.balances(user1);
    const user1Borrowed = await lendingContract.borrowedAmounts(user1);

    assert.equal(Number(user1Balance), Number(depositAmount) - Number(borrowAmount), "User1's balance is incorrect");
    assert.equal(Number(user1Borrowed), Number(borrowAmount), "User1's borrowed amount is incorrect");
  });

  it("should allow users to repay borrowed assets", async () => {
    const depositAmount = web3.utils.toWei("20", "ether"); // Convert 20 ETH to Wei
    await lendingContract.deposit({ from: user1, value: depositAmount });

    const borrowAmount = web3.utils.toWei("10", "ether"); // Convert 10 ETH to Wei
    await lendingContract.borrow(borrowAmount, { from: user1 });

    const repayAmount = web3.utils.toWei("5", "ether"); // Convert 5 ETH to Wei
    await lendingContract.repay({ from: user1, value: repayAmount });

    const user1Balance = await lendingContract.balances(user1);
    const user1Borrowed = await lendingContract.borrowedAmounts(user1);

    assert.equal(Number(user1Balance), Number(depositAmount) - Number(borrowAmount) + Number(repayAmount), "User1's balance is incorrect");
    assert.equal(Number(user1Borrowed), Number(borrowAmount) - Number(repayAmount), "User1's borrowed amount is incorrect");
  });
});
