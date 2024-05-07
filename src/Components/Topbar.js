import React, {useState} from 'react'
import CalculatePopup from './CalculatePopup'
import './Topbar.css'

const Topbar = () => {
    const [isCalcOpen, setIsCalcOpen] = useState(false)
    const toggleCalc = () => { setIsCalcOpen(!isCalcOpen) }

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
                <button className="calculate-button" onClick={toggleCalc}>
                    Calculate Inventory!
                </button>
                <CalculatePopup isOpen={isCalcOpen} toggle={toggleCalc}/>
            </div>
        </div>
    )
}

export default Topbar
