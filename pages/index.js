import { useState, useEffect } from "react";
import PrimaryButton from "../components/primary-button";
import TipButton from "../components/tip-button";
import Keyboard from "../components/keyboard";
import { UserCircleIcon } from "@heroicons/react/solid";
import getKeyboardsContract from "../utils/getKeyboardsContract";
import addressesEqual from "../utils/addressesEqual";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { useMetaMaskAccount } from "../components/meta-mask-account-provider";
export default function Home() {

  const { ethereum, connectedAccount, connectAccount } = useMetaMaskAccount();

  const [keyboards, setKeyboards] = useState([]);
  const [newKeyboard, setNewKeyboard] = useState("");
  const [keyboardsLoading, setKeyboardsLoading] = useState(false);

  const keyboardsContract = getKeyboardsContract(ethereum);

  /** Getting list of created keyboards  */
  const getKeyboards = async () => {
    if (ethereum && connectAccount) {
      setKeyboardsLoading(true);
      try {
        const keyboards = await keyboardsContract.getKeyboards();
        console.log("Retrieved keyboards...", keyboards);
        setKeyboards(keyboards);
      } finally {
        setKeyboardsLoading(false);
      }
    }
  };
  useEffect(() => getKeyboards(), [!!keyboardsContract, connectedAccount]);

  /** Handles events from Keyboards contract  */
  const addContractEventHandlers = () => {
    if (keyboardsContract && connectedAccount) {
      // Creates keyboard message + updates created keyboards list
      keyboardsContract.on("KeyboardCreated", async (keyboard) => {
        if (
          connectedAccount &&
          !addressesEqual(keyboard.owner, connectedAccount)
        ) {
          toast("Somebody created a new keyboard!", {
            id: JSON.stringify(keyboard),
            icon: "🥳",
          });
        }
        await getKeyboards();
      });

      // Sends Tip-message for user
      keyboardsContract.on("TipSent", (recipient, amount) => {
        if (addressesEqual(recipient, connectedAccount)) {
          toast(
            `You received a tip of ${ethers.utils.formatEther(amount)} eth!`,
            {
              id: recipient + amount,
              icon: "🤑",
            }
          );
        }
      });
    }
  };
  useEffect(addContractEventHandlers, [!!keyboardsContract, connectedAccount]);

  if (!ethereum) {
    return <p>Please install MetaMask to connect to this site</p>;
  }

  if (!connectedAccount) {
    return (
      <PrimaryButton onClick={connectAccount}>
        Connect MetaMask Wallet
      </PrimaryButton>
    );
  }

  const submitCreate = async (e) => {
    e.preventDefault();

    if (!ethereum) {
      console.error("Ethereum object is required to create a keyboard");
      return;
    }

    const createTxn = await keyboardsContract.create(newKeyboard);
    console.log("Create a transaction started... ", createTxn.hash);

    await createTxn.wait();
    console.log("Created keyboard!", createTxn.hash);

    await getKeyboards();
  };
  // if some keyboards are already have been created
  if (keyboards.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">
          Create a Keyboard!
        </PrimaryButton>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {keyboards.map(([kind, isPBT, filter, owner], i) => (
            <div key={i} className="relative">
              <Keyboard kind={kind} isPBT={isPBT} filter={filter} />
              <span className="absolute top-2 right-3">
                {addressesEqual(owner, connectedAccount) ? (
                  <UserCircleIcon className="h-8 w-8 text-stone-800" />
                ) : (
                  <TipButton keyboardsContract={keyboardsContract} index={i} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (keyboardsLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PrimaryButton type="link" href="/create">
          Create a Keyboard!
        </PrimaryButton>
        <p>Loading Keyboards...</p>
      </div>
    );
  }

  // If no keyboards yet
  return (
    <div className="flex flex-col gap-4">
      <PrimaryButton type="link" href="/create">
        Create a Keyboard!
      </PrimaryButton>
      <p>No keyboards yet!</p>
    </div>
  );
}
