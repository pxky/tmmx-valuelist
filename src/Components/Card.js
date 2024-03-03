import React from 'react'
import './Card.css'

export default function Card(args) {
  return (
    <div className="value-card">
        <div className="card-title">Candy Knife</div>
        <div className="card-main">
            <div className="card-image-frame"></div>
            <table className="card-stats">
            <tbody>
                <tr className="card-value">
                <td>Value:</td>
                <td className="card-value-text">10,000,000</td>
                </tr>
                <tr className="card-demand">
                <td>Demand:</td>
                <td className="card-demand-text">High</td>
                </tr>
                <tr className="card-trend">
                <td>Trend:</td>
                <td className="card-trend-text">Stable</td>
                </tr>
                <tr className="card-origin">
                <td>Origin:</td>
                <td className="card-origin-text">XMAS 2021 - 1199 ROBUX</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
  )
}
