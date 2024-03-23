import React from 'react'
import './Topbar.css'

export default function Topbar() {
    return (
        <div className="topbar-container">
            <div className="topbar">
                <button className="discord-button">
                    <img 
                        className="discord-logo"
                        src={`${process.env.PUBLIC_URL}/media/discord-logo.png`}
                        alt="discord logo"
                    />
                </button>
                <h1 className="topbar-title">
                    TMMX.POKY.CC
                </h1>
                <button className="calculate-button">
                    Calculate Your 
                    <br></br>
                    Inventory!
                </button>
            </div>
        </div>
    )
}
