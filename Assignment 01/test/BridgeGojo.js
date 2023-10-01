const BridgeGojo = artifacts.require('BridgeGojo');
const TokenGojo = artifacts.require('TokenGojo');

contract("BridgeGojo", (accounts) => {
  it("should deposit and withdraw tokens", async () => {
    const gojoBridgeInstance = await BridgeGojo.deployed();
    const gojoTokenInstance = await TokenGojo.deployed();

    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = web3.utils.toWei("1", "ether");

    // Deposit tokens
    await gojoTokenInstance.approve(gojoBridgeInstance.address, amount, { from: sender });
    await gojoBridgeInstance.deposit(amount, { from: sender });

    // Check balance in the bridge contract
    const bridgeBalance = await gojoTokenInstance.balanceOf(gojoBridgeInstance.address);
    assert.equal(bridgeBalance.toString(), amount, "Bridge balance is incorrect");

    // Withdraw tokens
    await gojoBridgeInstance.withdraw(recipient, amount, { from: sender });

    // Check recipient balance
    const recipientBalance = await gojoTokenInstance.balanceOf(recipient);
    assert.equal(recipientBalance.toString(), amount, "Recipient balance is incorrect");
  });
});

