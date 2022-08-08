# MechBoards

This project aims to give users opportunities to create incredible NFT's (ERC-721 tokens)
and share it with others users.


## Features

#### Application idea is to realize:

1. Creating and transfering assets of NFT tokens
2. Interacting users on platform through comments and tips to encourage creativity
3. Opportunities to add new set of baking componets (tools, assets, functions) thats can introduce <br /> some DAO features and making come to life community driven project

## Roadmap

> For now plans that newest roadmap changes and additions will be adding to coming realeases. Please see the [Realeases Page](https://github.com/IceTweak/keyboard-nft/releases)



## Acknowledgements

 - Loacal Ethereum environment - [Hardhat](https://hardhat.org/docs)
 - Yarn package manager - [Yarn Homepage](https://yarnpkg.com/)
 - Ethereum node API - [Alchemy](https://www.alchemy.com/)
 - NodeJS 16 - [NodeJS Install](https://nodejs.org/en/download/package-manager/)
 - NextJS - [Get Started Doc](https://nextjs.org/docs/getting-started)
 
 ## Run Locally

Clone the project

```bash
  git clone https://github.com/IceTweak/keyboard-nft.git
```

Go to the project directory

```bash
  cd nft-keyboards
```

Install dependencies

```bash
  yarn
```

Deploy the contract (but first [set .env configuration](https://github.com/IceTweak/keyboard-nft/edit/main/README.md#environment-variables))

```bash
  # if deploy to main
  npx hardhat run ./scripts.deploy.js
  # if deploy to other net
  npx hardhat run ./scripts.deploy.js --network NETWORK_TO_DEPLOY
```
Than you will be able to run your local web page on <b> https://localhost:3000 </b> using this command:

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ALCHEMY_API_KEY` - needed to bring Alchemy functionality into app;

`PRIVATE_METAMASK_KEY` - needed to add Metamask account to pay gas fee for contract creation and transactions


## License

For now this is [UNLICENSED](https://spdx.org/licenses/) product and source code.
Perhaps in the future it will changes.

## Authors

- [@IceTweak](https://www.github.com/icetweak)


