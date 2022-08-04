const { ethers } = require("hardhat");

async function main() {
    const [owner, other] = await ethers.getSigners();

    const keyboardsFactory = await ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsFactory.deploy();
    console.log("Contract deployed to: ", keyboardsContract.address);

    const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
    await keyboardTxn1.wait();

    const keyboardTxn2 = await keyboardsContract.create(1, false, "grayscale");
    await keyboardTxn2.wait();

    let keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });