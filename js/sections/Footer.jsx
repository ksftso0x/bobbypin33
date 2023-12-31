import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
import '../css/StartingPage.css'

export default function Footer() {
    return (
        <footer>
            <p>Canary Punks © All Rights Reserved</p>
            <div className='socials'>
                <a className="btn" target={'_blank'} href="https://twitter.com/Canary_Punks">
                    <FontAwesomeIcon className='awesome-icon' icon={faTwitter} />
                </a>
                <a className="btn" target={'_blank'} href="https://discord.gg/AeHt6y353Y">
                    <FontAwesomeIcon className='awesome-icon' icon={faDiscord} />
                </a >
            </div>
        </footer>
    )
}
