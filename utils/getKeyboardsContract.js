import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = "0xbb5542e2ED9Da4C3965b1651FdF041257a6a2eB0";
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
