import React from 'react';
import "./Popup.css";

function Popup(props) {
  return (
    <>
      {props.isPopupOpen && (
        <div className="popup-overlay">
          <h2 className="popup-title">{props.Title}</h2>
          <button className="popup-close" onClick={props.togglePopup}>X</button>
          <div className="popup-body">{props.Body}</div>
        </div>
      )}
    </>
  );
}

export default Popup;
