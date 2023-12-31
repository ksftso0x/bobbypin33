import React from 'react'
import '../css/stats.css'
import { ethers } from 'ethers'
import config from "../config/config.json"
import { useGlobalState } from '../globalState'
import { useState, useEffect } from 'react'



export default function Stats() {
    const [contract, setContract] = useGlobalState("contract");
    const [chain, setChain] = useGlobalState("chain");
    const [stakers, setStaker] = useState("...")
    
async function GetStakers() {
    let _output = "...";
    if(chain == config.CHAIN_ID)
    {
        try {
            // console.log(contract)
             if (contract !== null) {
                 const tempStakerCount = await contract.stakerCount();
            //     console.log(tempStakerCount.toString());
                 _output = tempStakerCount.toString();
             } else {
                 _output = "..."
             }
         } catch (e) {
             //console.log(e);
         }
    }
    setStaker(_output);
}

useEffect(() => {
    GetStakers();
}, [contract, chain]);

if(!contract)
{
    return (
        <div className='stats-display'>
            <div className='stat-block'>
                <p style={{"font-size":"4em"}}>To view statistics</p>
                <p style={{"font-size":"2em"}}>Please Connect Your Wallet</p>
            </div>
        </div>
    )
}

    return (
        <div className='stats-display'>
            <div className='stat-block'>
                <p>{config.POOLS}</p>
                <p>Pools</p>
            </div>
            <div className='stat-block'>
            <p>{stakers}</p>
                <p>Total Stakers</p>
            </div>
            <div className='stat-block'>
                <p>{config.COINS_SUPPORTED}</p>
                <p>Coins Supported</p>
            </div>
        </div>
    )
}
