import React, { useState } from 'react';
import './Card.css'
import { processData } from './Data.js'

let SettingData = []
processData().then((data) => {
  SettingData = data.SettingData
}).catch(error => {
  console.error('Error processing data:', error);
});

function formatValue(value) {
  if (value === 0) {
    return "???"
  }
  return value.toLocaleString()
}

function formatDate(date) {
  if (!date) return "Unknown";
  date = new Date(date * 1000);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();
  const ordinalIndicator = (day % 10 === 1 && day !== 11) ? 'st' :
                           (day % 10 === 2 && day !== 12) ? 'nd' :
                           (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
  return `${day}${ordinalIndicator} ${month} ${year}`;
}

function ImageWithFallback({ src, fallbackSrc, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => {
      setImgSrc(fallbackSrc);
  };
  return <img src={imgSrc} alt="item" onError={onError} {...props} />;
}

export default function Card({ props, order }) {
  return (
    <div className="value-card" quality={props.QualityName} style={{ order: order }} >
      <div className="card-title">
        <div className="title-text">
          {props.DisplayName}
        </div>
      </div>
      <div className="card-main">
        <div className="card-image-frame">
          <ImageWithFallback
            src={`https://assetdelivery.roblox.com/v1/asset/?id=${props.Image}`}
            fallbackSrc={`${process.env.PUBLIC_URL}/media/question-mark.png`}
            alt="item"
            className="card-image"
          />
          <img
            className="card-image"
            src={`${process.env.PUBLIC_URL}/media/question-mark.png`}
            alt="item"
          />
        </div>
        <table className="card-stats">
          <tbody>
            <tr className="card-value">
              <td>Value:</td>
              <td className="card-value-text">{formatValue(props.Value)}</td>
            </tr>
            <tr className="card-demand">
              <td>Demand:</td>
              <td className={`card-demand-text text-color${props.Demand}`}>{SettingData.DemandKeys[props.Demand]}</td>
            </tr>
            <tr className="card-trend">
              <td>Trend:</td>
              <td className={`card-trend-text text-color${props.Trend}`}>{SettingData.TrendKeys[props.Trend]}</td>
            </tr>
            <tr className="card-birthday">
              <td>Birthday:</td>
              <td className="card-birthday-text">{formatDate(props.CreationTime)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
