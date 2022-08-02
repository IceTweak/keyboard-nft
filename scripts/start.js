const { ethers } = require("hardhat");

async function main() {
    const [owner, other] = await ethers.getSigners();

    const keyboardsFactory = await ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsFactory.deploy();
    console.log("Contract deployed to: ", keyboardsContract.address);

    const keyboardTxn1 = await keyboardsContract.create("A really great keyboard!");
    await keyboardTxn1.wait();

    const keyboardTxn2 = await keyboardsContract.connect(other).create("An even cool keyboard!");
    await keyboardTxn2.wait();

    let keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);

    keyboards = await keyboardsContract.connect(other).getKeyboards();
    console.log("And somebody else!", keyboards);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });