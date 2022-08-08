import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = "0xec87371c46Ce339194541C217ECa997756655bBc";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
