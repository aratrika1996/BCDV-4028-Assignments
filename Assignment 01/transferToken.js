const Web3 = require("web3");
const gojoBridgeABI = require("./build/contracts/BridgeGojo.json").abi;
const sukunaBridgeABI = require("./build/contracts/BridgeSukuna.json").abi;

const web3Gojo = new Web3("http://127.0.0.1:8545/");
const web3Sukuna = new Web3("https://sepolia.infura.io/v3/7e002d56bc2643aea850ad638e355e32");

const gojoBridgeAddress = "0x9fc4129BF78f7DB56654B28a975B435D806e3479";
const sukunaBridgeAddress = "0xD358Af3b23E5Df80Cfd7f99BfFF6A01CA6270A4C";
const senderAddress = "0x23535047095Afeaa89c8a369dFb1119567E15b7A";

const gojoBridge = new web3Gojo.eth.Contract(gojoBridgeABI, gojoBridgeAddress);
const sukunaBridge = new web3Sukuna.eth.Contract(sukunaBridgeABI, sukunaBridgeAddress);

async function transferTokens() {
  const amount = web3Gojo.utils.toWei("1", "ether");

  // Deposit tokens on Ethereum
  await gojoBridge.methods.deposit(amount).send({ from: senderAddress });

  // Wait for confirmation and check bridge balance on Ethereum
  const gojoBridgeBalance = await web3Gojo.eth.getBalance(gojoBridgeAddress);
  console.log(`GOJO Bridge Balance: ${web3Gojo.utils.fromWei(gojoBridgeBalance, "ether")} GOJO`);


  // Withdraw tokens on Sepolia
  await sukunaBridge.methods.withdraw(senderAddress, amount).send({ from: senderAddress });

  // Wait for confirmation and check bridge balance on Sepolia
  const sukunaBridgeBalance = await web3Sukuna.eth.getBalance(sukunaBridgeAddress);
  console.log(`SUKUNA Bridge Balance: ${web3Sukuna.utils.fromWei(sukunaBridgeBalance, "ether")} SUKUNA`);
}

transferTokens();
