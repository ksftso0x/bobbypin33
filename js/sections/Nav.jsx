import React, { useState } from 'react'
import brand from '../images/brand.png'
import '../css/nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import Info from '../sections/Info'
import WalletConnection from '../elements/WalletConnection'
import { useGlobalState } from '../globalState'
import { ethers } from 'ethers'
import ERC20_ABI from '../config/erc20abi.json'
import config from '../config/config.json'


export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [provider, setProvider] = useGlobalState("provider");

    // Load the ERC20 contract at the specified address
    let contractStaked = new ethers.Contract(config.CGLD_ADDR, ERC20_ABI, provider);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    let menuItemsForMobile;
    if (isTabOpen) {
        menuItemsForMobile =
            <div className='menu-items-mobile'>
                <hr />
                <a className="btn" target={'_blank'} href="https://canarypunks.xyz/">
                    <img src={brand} alt="Canary Punks" />
                </a>
                <hr />
                <WalletConnection></WalletConnection>
                <hr />
                <button className="btn wallet-connect" onClick={() => {contractStaked?.claimReflection()}}>Claim CGLD Rewards</button>
                <hr />
                <button className="btn" onClick={() => setIsOpen(true)}>
                    How this works?
                </button>
                <hr />
                <a className="btn" target={'_blank'} href="https://stake.canarypunks.xyz/">
                    NFT Staking
                </a>
                <hr />
                <div style={{ "paddingBottom": "1em" }}>
                    <a className="btn" target={'_blank'} href="https://discord.gg/AeHt6y353Y">
                        <FontAwesomeIcon className='awesome-icon' icon={faDiscord} />
                    </a >
                    <a className="btn" target={'_blank'} href="https://twitter.com/Canary_Punks">
                        <FontAwesomeIcon className='awesome-icon' icon={faTwitter} />
                    </a>
                </div>
            </div>
            ;
    }
    if (!isTabOpen) {
        menuItemsForMobile =
            <div className='menu-items-mobile hide'>
                <hr />
                <a className="btn" target={'_blank'} href="https://canarypunks.xyz/">
                    <img src={brand} alt="Canary Punks" />
                </a>
                <hr />
                <WalletConnection></WalletConnection>
                <hr />
                <button className="btn wallet-connect" onClick={() => {contractStaked?.claimReflection()}}>Claim CGLD Rewards</button>
                <hr />
                <button className="btn" onClick={() => setIsOpen(true)}>
                    How this works?
                </button>
                <hr />
                <a className="btn" target={'_blank'} href="https://stake.canarypunks.xyz/">
                    NFT Staking
                </a>
                <hr />
                <div>
                    <a className="btn" target={'_blank'} href="https://discord.gg/AeHt6y353Y">
                        <FontAwesomeIcon className='awesome-icon' icon={faDiscord} />
                    </a>
                    <a className="btn" target={'_blank'} href="https://twitter.com/Canary_Punks">
                        <FontAwesomeIcon className='awesome-icon' icon={faTwitter} />
                    </a>
                </div>
            </div>

            ;
    }
    if (isTabletOrMobile) {
        return (
            <nav>
                <button className='btn' onClick={() => setIsTabOpen(!isTabOpen)}>
                    <FontAwesomeIcon className='awesome-icon' icon={faBars} />

                </button>
                {menuItemsForMobile}
                <Info open={isOpen} onClose={() => setIsOpen(false)}></Info>
            </nav>
        )
    }
    return (
        <nav>
            <div className='left'>
                <a className="btn" target={'_blank'} href="https://canarypunks.xyz/">
                    <img src={brand} alt="Canary Punks" />
                </a>
                <button className="btn" onClick={() => setIsOpen(true)}>
                    How this works?
                </button>
                <a className="btn" target={'_blank'} href="https://stake.canarypunks.xyz/">
                    NFT Staking
                </a>
            </div>
            <div className='right'>
                <a className="btn" target={'_blank'} href="https://twitter.com/Canary_Punks">
                    <FontAwesomeIcon className='awesome-icon' icon={faTwitter} />
                </a>
                <a className="btn" target={'_blank'} href="https://discord.gg/AeHt6y353Y">
                    <FontAwesomeIcon className='awesome-icon' icon={faDiscord} />
                </a>
                <button className="btn wallet-connect" onClick={() => {contractStaked?.claimReflection()}}>Claim CGLD Rewards</button>
                <WalletConnection></WalletConnection>
            </div>
            <Info open={isOpen} onClose={() => setIsOpen(false)}></Info>
        </nav>
    )
}
