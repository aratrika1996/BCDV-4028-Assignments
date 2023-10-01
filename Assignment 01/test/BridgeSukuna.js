const BridgeSukuna = artifacts.require('BridgeSukuna');
const TokenSukuna = artifacts.require('TokenSukuna');

contract("BridgeSukuna", (accounts) => {
  it("should deposit and withdraw tokens", async () => {
    const sukunaBridgeInstance = await BridgeSukuna.deployed();
    const sukunaTokenInstance = await TokenSukuna.deployed();

    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = web3.utils.toWei("1", "ether");

    // Deposit tokens
    await sukunaTokenInstance.approve(sukunaBridgeInstance.address, amount, { from: sender });
    await sukunaBridgeInstance.deposit(amount, { from: sender });

    // Check balance in the bridge contract
    const bridgeBalance = await sukunaTokenInstance.balanceOf(sukunaBridgeInstance.address);
    assert.equal(bridgeBalance.toString(), amount, "Bridge balance is incorrect");

    // Withdraw tokens
    await sukunaBridgeInstance.withdraw(recipient, amount, { from: sender });

    // Check recipient balance
    const recipientBalance = await sukunaTokenInstance.balanceOf(recipient);
    assert.equal(recipientBalance.toString(), amount, "Recipient balance is incorrect");
  });
});

