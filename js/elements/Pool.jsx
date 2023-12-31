import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { useGlobalState } from '../globalState';
import PoolPopup from './PoolPopup';

export default function Pool(props) {
  const [coinStaking, setCoinStaking] = useState(props.coinStaking);
  const [coinFarmed, setCoinFarmed] = useState(props.coinFarmed);
  const [stakedAddress, setStakedAddress] = useState(props.stakedAddress);
  const [farmedAddress, setFarmedAddress] = useState(props.farmedAddress);
  const [contract, setContract] = useGlobalState("contract");
  const [chain, setChain] = useGlobalState("chain");
  const [account, setAccout] = useGlobalState("account");
  const [currentTime, setCurrentTime] = useState(0);

  // Display clause
  const [poolInfo, setPoolInfo] = useState(null);
  const [yieldInfo, setYieldInfo] = useState(null);
  const [stakedAmount, setStakedAmount] = useState(null)

  // Popup window state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStake, setPopupStake] = useState(false);

  // Functions
  const convertToTime = (time) => {

    if(time > 0)
    {
      let seconds = time % 60;
      let minutes = Math.floor(time / 60) % 60;
      let hours = Math.floor(time / 3600) % 24;
      let days = Math.floor(time / 86400);
      return `${days}d:${hours}h:${minutes}m:${seconds}s`;
    } else
    {
      return `unlocked!`
    }
    
  }

  const getRemainingTime = (_startDate, _time) =>
  {
    let time = (Number(_startDate) + Number(_time))-(Date.now() / 1000 | 0)
    return time;
  }



  // Fetch pool info from the contract
  useEffect(() => {
    if (contract) {
      contract.getPool(stakedAddress, farmedAddress).then(setPoolInfo);
      contract.getYield(stakedAddress, farmedAddress, account).then(setYieldInfo);
      contract.stakes( stakedAddress, farmedAddress, account).then(setStakedAmount);
    }
  }, [contract, stakedAddress, farmedAddress, popupOpen, popupStake]);

  useEffect(() => {
    setTimeout(() => {
      if (contract) {
        contract.getPool(stakedAddress, farmedAddress).then(setPoolInfo);
        contract.getYield(stakedAddress, farmedAddress, account).then(setYieldInfo);
        contract.stakes( stakedAddress, farmedAddress, account).then(setStakedAmount);
      }
      setCurrentTime(  getRemainingTime(stakedAmount?.startDate.toString(), poolInfo?.lockLength.toString()));
    }, 1000);
  }, [currentTime])

  if (!contract) {
    return <></>
  }

  if (chain != "19") {
    return <></>
  }

  // Display pool info
  if (!poolInfo || !yieldInfo || !stakedAmount) {
    return <p>Loading pool info...</p>;
  }

  if (poolInfo && yieldInfo && stakedAmount) {
    console.log(stakedAmount.amount.toString());
    console.log(poolInfo);
    console.log(poolInfo.lockable.toString());
    console.log(yieldInfo.toString());
    return (
      <div className='pool'>
        <p>Stake <span className='token-name'>{coinStaking}</span> for <span className='token-name'>{coinFarmed}</span></p>
        {poolInfo.totalValueCap.toString() != "0" &&
          <>
            <p className='cap'>Cap</p>
            <div className='progress-bar'>
              <p>
                {(poolInfo.totalValueLocked.toString() / 1000000000000000000).toFixed(2)}/{(poolInfo.totalValueCap.toString() / 1000000000000000000).toFixed(2)}
              </p>
              <div className='fill' style={{ "width": ((poolInfo.totalValueLocked.toString() / 1000000000000000000).toFixed(2)) / ((poolInfo.totalValueCap.toString() / 1000000000000000000).toFixed(2)) * 100 + "%" }}>

              </div>
            </div>
          </>
        }
        <p>TVL: <span>{(poolInfo.totalValueLocked.toString() / 1000000000000000000).toFixed(2)}</span> {coinStaking}</p>
        <p>APY: <span>{poolInfo.apy.toString()}</span>%</p>
        <hr />
        <p>Staked: <span>{(stakedAmount.amount.toString() / 1000000000000000000).toFixed(6)}</span> {coinStaking}</p>
        <p>Rewards: <span>{(yieldInfo.toString() / 1000000000000000000).toFixed(6)}</span> {coinFarmed}</p>
        {poolInfo.lockable.toString() == "true" && stakedAmount == 0 &&
          <p>Lock length: <span>{convertToTime(poolInfo.lockLength.toString())}</span></p>
        || ( poolInfo.lockable.toString() == "true" &&
        <p>Locked for: <span>{convertToTime(currentTime)}</span></p>
        )}
        <div className='buttons'>
          <button className='deposit' onClick={() => { setPopupOpen(true); setPopupStake(true) }} disabled={poolInfo.totalValueLocked.toString() == poolInfo.totalValueCap.toString() && poolInfo.totalValueCap.toString() != 0}>Deposit</button>
          <button className='withdraw' onClick={() => { setPopupOpen(true); setPopupStake(false) }} disabled={currentTime > "0" || stakedAmount.amount == 0}>Withdraw</button>
          <button className='claim' onClick={() => {
            contract?.farm(stakedAddress, farmedAddress).then(
              () => window.location.reload()
              )
          }} disabled={yieldInfo.toString() < 1000000000000}>Claim</button>
        </div>
        {popupOpen && popupStake &&
          <PoolPopup
            open={popupOpen}
            setClose={setPopupOpen}
            windowName={`Deposit ${coinStaking}`}
            stakedAddress={stakedAddress}
            farmedAddress={farmedAddress}
            contract={contract}
            poolInfo={poolInfo}
            stake={popupStake}
          />
        }
        {popupOpen && !popupStake &&
          <PoolPopup
            open={popupOpen}
            setClose={setPopupOpen}
            windowName={`Withdraw ${coinStaking}`}
            stakedAddress={stakedAddress}
            farmedAddress={farmedAddress}
            contract={contract}
            poolInfo={poolInfo}
            stakedAmount={stakedAmount.amount}
            stake={popupStake}
          />
        }
      </div>
    )
  }
}
