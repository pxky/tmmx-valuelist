import React from 'react'
import './Card.css'

const DemandKeys = {
  1: "NONE",
  2: "Bad",
  3: "Ok",
  4: "Good",
  5: "Amazing!"
};

const TrendKeys = {
  1: "DYING",
  2: "Lowering",
  3: "Stable",
  4: "Raising",
  5: "Skyrocketing!"
};

export default function Card({ props }) {
  return (
    <div className="value-card" group={props.group}>
        <div className="card-title">
          <div className="title-text">
            {props.name}
          </div>
        </div>
        <div className="card-main">
            <div className="card-image-frame">
              <img class="card-image" src={process.env.PUBLIC_URL + '/media/question-mark.png'}></img>
            </div>
            <table className="card-stats">
            <tbody>
                <tr className="card-value">
                <td>Value:</td>
                <td className="card-value-text">{props.value.toLocaleString()}</td>
                </tr>
                <tr className="card-demand">
                <td>Demand:</td>
                <td className={`card-demand-text text-color${props.demand}`}>{DemandKeys[props.demand]}</td>
                </tr>
                <tr className="card-trend">
                <td>Trend:</td>
                <td className={`card-trend-text text-color${props.trend}`}>{TrendKeys[props.trend]}</td>
                </tr>
                <tr className="card-origin">
                <td>Origin:</td>
                <td className="card-origin-text">{props.origin}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
  )
}
