import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from "../config/abi.json"
import config from "../config/config.json"
import { setGlobalState, useGlobalState } from '../globalState';
export let poolsNum = "...";
export let coinsSupported = "...";

async function getSongbirdChain() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13' }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x13',
                            chainName: 'Songbird Canary-Network ',
                            rpcUrls: ['https://songbird.towolabs.com/rpc'] /* ... */,
                        },
                    ],
                });
            } catch (addError) {
                // handle "add" error
            }
        }
        // handle other "switch" errors
    }
}

export default function WalletConnection() {

    const [account, setAccount] = useState();
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [chain, setChainId] = useState();

    const InitConnection = async () => {
        // Check for metamask
        if (typeof window.ethereum !== "undefined") {
       //     console.log("Metamask detected!")

            //get list of accounts
            const accountsList = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccount(accountsList[0]);
            //get provider
            setProvider(await new ethers.providers.Web3Provider(window.ethereum));
            await provider.send("eth_requestAccounts", []);
            const tempSigner = await provider.getSigner();
            setSigner(tempSigner);

        } else {
          //  console.log("Metamask not detected")
        }
    }

    useEffect(() => {
        if (!signer) {
                InitConnection();
                console.log("initThrougState");
        }
    }, [account, signer, chain]);

    useEffect(() => {
        console.log("useEffect duo")
        console.log(signer);
        // This callback will be run whenever the signer state value changes
        if (signer) {
          // Perform checks and updates with the new signer value
          if (typeof window.ethereum !== "undefined") {
          if (window.ethereum.networkVersion == config.CHAIN_ID) {
            setGlobalState("contract", new ethers.Contract(config.SC_ADDR, abi, signer));
            setGlobalState("provider", signer);
            setGlobalState("account", account);
            setGlobalState("chain", window.ethereum.networkVersion);
            setChainId(window.ethereum.networkVersion);
          } else {
            getSongbirdChain();
          }
        }
    }
      }, [signer]); // Run the callback when the signer state value changes

      if(typeof window.ethereum !== "undefined") {
    window.ethereum.on('chainChanged', () => {
        window.location.reload()
        console.log('chainChanged');
    })
    window.ethereum.on('accountsChanged', () => {
        window.location.reload()
        console.log('accountsChanged');
    })
}

    return (
        <button onClick={InitConnection} className="btn wallet-connect">
            {chain != 19 && account != null &&
                "Wrong Network"
            }
            {account == null && typeof window.ethereum !== "undefined" &&
                "Connect Wallet"
            }
            {typeof window.ethereum === "undefined" &&
                "Install Metamask"
            }
            {chain == 19 &&
                account.toString().substring(0, 10) + "..."
            }
        </button>
    )
}
