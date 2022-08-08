const { ethers } = require("hardhat");

async function main() {
  const [owner, other] = await ethers.getSigners();

  const keyboardsFactory = await ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
  await keyboardTxn.wait();

  const tipTxn = await keyboardsContract.connect(other).tip(0, {value: hre.ethers.utils.parseEther("1")})
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
