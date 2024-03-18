import React from 'react'
import './Topbar.css'

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbar-container left-align">
                <h1>zzz</h1>
            </div>
            <div className="topbar-container center-align">
                <div className="search">
                    <input type="text" placeholder="Search..."/>
                    <button>Search</button>
                </div>
            </div>
            <div className="topbar-container right-align"> 
                <h1>x</h1>
            </div>
        </div>
    )
}