import React from 'react'
import '../css/featured.css'
import Pool from '../elements/Pool'
import pools from '../config/pool.json'
import { useGlobalState } from '../globalState'


export default function Featured() {

  const [contract, setContract] = useGlobalState("contract"); 


  if (!contract) {
    return (
      <div className='featured con'>
         <h1 className='error'>Please connect your wallet!</h1>
    </div>
    )
  }
  return (
    <div className='featured'>
         <h1>Pools</h1>
         <div className='pools-list'>
            {pools.map(pool => (
              <Pool
                coinStaking={pool.coinStaking}
                coinFarmed={pool.coinFarmed}
                stakedAddress={pool.stakedAddress}
                farmedAddress={pool.farmedAddress}
              />
            ))}
         </div>
    </div>
  )
}
