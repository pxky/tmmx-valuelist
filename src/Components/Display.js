import React from 'react'
import Card from './Card'
import './Display.css'

const sample_data = [{
  "name": "Candy Knife",
  "value": 5000000,
  "demand": 4,
  "trend": 3,
  "group": "Christmas 2021",
  "tier": "Collectors",
  "origin": "1199 R$"
}, {
  "name": "Candy Gun",
  "value": 5000000,
  "demand": 4,
  "trend": 3,
  "group": "Christmas 2021",
  "tier": "Collectors",
  "origin": "1199 R$"
}, {
  "name": "Candy Reindeer",
  "value": 2500000,
  "demand": 4,
  "trend": 3,
  "group": "Christmas 2021",
  "tier": "Collectors",
  "origin": "799 R$"
}, {
  "name": "Cosmic Knife",
  "value": 400000,
  "demand": 3,
  "trend": 3,
  "group": "New Year 2022",
  "tier": "Collectors",
  "origin": "1199 R$"
}, {
  "name": "Cosmic Gun",
  "value": 400000,
  "demand": 3,
  "trend": 3,
  "group": "New Year 2022",
  "tier": "Collectors",
  "origin": "1199 R$"
}, {
  "name": "Cosmic Cat",
  "value": 160000,
  "demand": 3,
  "trend": 3,
  "group": "New Year 2022",
  "tier": "Collectors",
  "origin": "799 R$"
}, {
  "name": "Katana",
  "value": 100000,
  "demand": 2,
  "trend": 3,
  "group": "Classic",
  "tier": "Mythical",
  "origin": "Wood, Metal, Planet crates"
}, {
  "name": "Galaxy Sniper",
  "value": 100000,
  "demand": 2,
  "trend": 3,
  "group": "Classic",
  "tier": "Mythical",
  "origin": "Wood, Metal, Planet crates"
}]

const SortDataByKey = (data, key) => {
  return data.reduce((map, item) => {
    const grouping = item[key];
    map[grouping] = map[grouping] || []
    map[grouping].push(item);
    return map;
 }, {});
}

export default function Display() {
  const SortedData = SortDataByKey(sample_data, "group");

  return (
    <div className="main-display">
      {Object.keys(SortedData).map((groupingName) => (
        <div key={groupingName} className="tier-display">
          <h2 className="display-name">{groupingName}</h2>
          <div className="display-cards">
            {SortedData[groupingName].map((item) => (
              <Card key={item.name} props={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
