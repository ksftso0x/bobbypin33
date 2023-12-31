import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useGlobalState } from '../globalState';
import '../css/info.css';
import ERC20_ABI from '../config/erc20abi.json'
import config from '../config/config.json'



export default function PoolPopup(props) {
    const [value, setValue] = useState(1);
    const [contract, setContract] = useGlobalState("contract");
    const [provider, setProvider] = useGlobalState("provider");
    const [account, setAccount] = useGlobalState("account");

    // Load the ERC20 contract at the specified address
    let contractStaked = new ethers.Contract(props.stakedAddress, ERC20_ABI, provider);

    // Set the value state when the open prop changes


    useEffect(() => {
        setValue(1);
        if (props.poolInfo && !props.stake) {
            // setValue(props.poolInfo.userValueStaked.toString() / 1000000000000000000);
        }
    }, [props.open, props.poolInfo]);

    if (props.open == true) return (
        <article className='info'>
            <div className='info-box'>
                <h1>{props.windowName}</h1>

                {props.stake &&
                    <input type="range" name="slider" id="slider" className='slider' value={value} onChange={(e) => setValue(e.target.value)} min="1" />
                }
                {!props.stake && props.stakedAmount != 0 &&
                    <input type="range" name="slider" id="slider" className='slider' value={value} onChange={(e) => setValue(e.target.value)} min="1" max={props.stakedAmount.toString() / 1000000000000000000} />
                }
                <input type="number" name="slider" id="numBox" className='num-box' value={value} onChange={(e) => setValue(e.target.value)} min="1" />
                <div className='buttons' >
                    {props.stake &&
                        <button className='allow' onClick={() => {
                            let userAddress = account;
                            contractStaked.approve(config.SC_ADDR, (10000).toString() + "000000000000000000").then((transaction) => {
                                // The allowance has been set
                                console.log("Allowance set: " + transaction.hash);
                            });
                        }}>
                            Set Allowance
                        </button>
                    }
                    {props.stake &&
                        <button className='run' onClick={() => {
                            contract?.stake(props.stakedAddress, props.farmedAddress, (value).toString() + "000000000000000000").then(
                                () => window.location.reload()
                                )
                        }}>Deposit</button>
                    }
                    {!props.stake &&
                        <button className='run' onClick={() => {
                            contract?.unstake(props.stakedAddress, props.farmedAddress, (value).toString() + "000000000000000000").then(
                            () => window.location.reload()
                            )

                        }}>Withdraw</button>

                    }
                    <button className='quit' onClick={() => props.setClose(false)}>Cancel</button>
                </div>
            </div>
        </article>
    )
    return (
        <article className='info hide'>
            <div className='info-box'>
                <h1>{props.windowName}</h1>
                <input type="range" name="slider" id="slider" className='slider' value={value} onChange={(e) => setValue(e.target.value)} />

                <input type="number" name="slider" id="numBox" className='num-box' value={value} onChange={(e) => setValue(e.target.value)} />
                <div className='buttons'>
                    <button className='run' onClick={() => contract?.stake(props.stakedAddress, props.farmedAddress, (value).toString() + "000000000000000000")}>Deposit</button>
                    <button className='quit' onClick={() => props.setClose(false)}>Cancel</button>
                </div>
            </div>
        </article>
    )
}
