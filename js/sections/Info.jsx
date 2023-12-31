import React from 'react'
import '../css/info.css'



export default function Info({open, onClose}) {
    if(!open) return (
        <article className='info hide'>
            <div className='info-box'>
                <div className='buttons-for-article'>
                <button className='btn' onClick={onClose}>X</button>
                </div>
                <h1>Deposit</h1>
                <p>
                    Click <strong>deposit</strong> in the pool you desire to farm. <br />
                    Specify the amount of tokens you desire to stake. <br />
                    Approve your tokens, click Deposit and successfully send the transaction to start earning passive income!
                </p>
                <h1>Lock</h1>
                <p>
                    Some pools will require you to lock your tokens for a certain amount of time. <br />
                    After you lock your tokens in these pools, you will need to <strong>fill that time to get your deposit back</strong>. <br />
                    You can view the lock time, and your remaining time in the info boxes for each pool above.
                </p>
                <h1>
                    Claim
                </h1>
                <p>
                    CLAIM

                    No matter if the pool you have deposited into is lockable or not, <br />
                    <strong>you can claim your rewards any time</strong>. <br />
                    The yield depends on the current supply of the token, the APY and your investment.
                    <br /> <br />
                    If you are a Canary Gold holder, you can also claim your reflection rewards <br />
                    using the <strong>Claim CGLD Rewards</strong> button.
                </p>
            </div>
        </article>
    ) 
    return (
        <article className='info'>
            <div className='info-box'>
                <div className='buttons-for-article'>
                <button className='btn' onClick={onClose}>X</button>
                </div>
                <h1>Deposit</h1>
                <p>
                    Click <strong>deposit</strong> in the pool you desire to farm. <br />
                    Specify the amount of tokens you desire to stake. <br />
                    Approve your tokens, click Deposit and successfully send the transaction to start earning passive income!
                </p>
                <h1>Lock</h1>
                <p>
                    Some pools will require you to lock your tokens for a certain amount of time. <br />
                    After you lock your tokens in these pools, you will need to <strong>fill that time to get your deposit back</strong>. <br />
                    You can view the lock time, and your remaining time in the info boxes for each pool above.
                </p>
                <h1>
                    Claim
                </h1>
                <p>
                    CLAIM

                    No matter if the pool you have deposited into is lockable or not, <br />
                    <strong>you can claim your rewards any time</strong>. <br />
                    The yield depends on the current supply of the token, the APY and your investment.
                    <br /> <br />
                    If you are a Canary Gold holder, you can also claim your reflection rewards <br />
                    using the <strong>Claim CGLD Rewards</strong> button.
                </p>
            </div>
        </article>
    )
}
