import Popup from "./Popup";
import "./CalculatePopup.css";
import {processData} from "./Data"

let ValueData = []
processData().then((data) => {
    ValueData = data.ValueData
}).catch(error => {
    console.error('Error processing data:', error);
});

const CalculatePopup = ({ isOpen, toggle }) => {
    let props = {
        isPopupOpen: isOpen,
        togglePopup: toggle,
        Title: "Calculate Your Inventory!",
        Body: <>
            Paste your inventory dump here:
            <textarea id="inv-dump"></textarea>
            <div className="calc-buttons">
                <button className="calc-button" id="copy" onClick={() => {
                    const text = document.getElementById("inv-dump");

                    text.select();
                    text.setSelectionRange(0, 99999);
                  
                    navigator.clipboard.writeText(text.value);
                  
                    alert("Copied text: " + text.value);
                }}>
                    Copy Result
                </button>
                <button className="calc-button" id="calculate" onClick={() => {
                    const text = document.getElementById("inv-dump");
                    const json = JSON.parse(text.value)
                    let total_value = 0
                    let total_items = 0

                    for (const i in json) {
                        const item = ValueData.find(v => v.Name === json[i].Name)
                        if (item) {
                            if (item.IsTradeable === false) {continue}
                            total_value += item.Value * json[i].Stack;
                            total_items += json[i].Stack
                            console.log(total_value, total_items)
                            continue
                        }
                    }
                    console.log(`Total Value: ${total_value}`)
                    console.log(`Total Items: ${total_items}`)
                }}>
                    CALCULATE!
                </button>
                <button className="calc-button" id="paste" onClick={() => {
                    navigator.clipboard.readText().then(text => {
                        document.getElementById("inv-dump").value = text;
                    })
                }}>
                    Paste Data
                </button>
            </div>
        </>
    }
    return Popup(props)
}

export default CalculatePopup
