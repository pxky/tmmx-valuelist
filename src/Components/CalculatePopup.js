import Popup from "./Popup";
import "./CalculatePopup.css";
import {processData} from "./Data"

let ValueData = []
processData().then((data) => {
    ValueData = data.ValueData
}).catch(error => {
    console.error('Error processing data:', error);
});

const formatNumber = (num) => {
    return num.toLocaleString('en-US', {
        maximumFractionDigits: 1,
        notation: 'compact',
        compactDisplay: 'short'
      });
}

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
                    try {
                        const text = document.getElementById("inv-dump");
                        text.select();
                        text.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(text.value);
                        document.getElementById("inv-dump").value = "Copied to clipboard!"
                    } catch (e) {
                        document.getElementById("inv-dump").value = `ERROR:\n${e}`
                    }
                }}>
                    Copy Result
                </button>
                <button className="calc-button" id="calculate" onClick={() => {
                    try {
                        const text = document.getElementById("inv-dump");
                        const json = JSON.parse(text.value)
                        let total_value = 0
                        let total_item_count = 0
                        let items_string = ""
                        for (const i in json) {
                            const item = ValueData.find(v => v.Name === json[i].Name)
                            if (item) {
                                if (item.IsTradeable === false) {continue}
                                const total_item_value = item.Value * json[i].Stack
                                total_value += total_item_value
                                total_item_count += json[i].Stack
                                let string = `${json[i].Stack}x ${item.DisplayName}`
                                if (string.length < 20) {
                                    for (let i = 1; i < (20 - string.length) * 69; i++) {
                                        string += " "
                                    }
                                }
                                items_string += `${string} + ${formatNumber(total_item_value)}\n`
                                continue
                            }
                        }
                        total_value = formatNumber(total_value)
                        total_item_count = formatNumber(total_item_count)
                        document.getElementById("inv-dump").value = `Total Value: ${total_value}\nTotal Items: ${total_item_count}\n\n===== raw data: =====\n${items_string}\n\nlike and subscribe`
                    } catch (e) {
                        document.getElementById("inv-dump").value = `ERROR:\n${e}`
                    }
                }}>
                    CALCULATE!
                </button>
                <button className="calc-button" id="paste" onClick={() => {
                    try {
                        navigator.clipboard.readText().then(text => {
                            document.getElementById("inv-dump").value = text;
                        })
                    } catch (e) {
                        document.getElementById("inv-dump").value = `ERROR:\n${e}`
                    }
                }}>
                    Paste Data
                </button>
            </div>
        </>
    }
    return Popup(props)
}

export default CalculatePopup
