import React, { useState, useRef  } from 'react'
import { VariableSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import Card from './Card'
import './Display.css'

const corsProxyUrl = "https://api.allorigins.win/raw?url="
const dataUrl = "https://pastebin.com/raw/4BGbhSfV"
let data = []

const cardMargin = 3
const cardWidth = 300 + (cardMargin * 2)
const cardHeight = 180 + (cardMargin * 2)
const rowSidePadding = 20
const tierTitleHeight = 120
const categoryTitleHeight = 40

await fetch(corsProxyUrl + dataUrl, { method: "GET" })
  .then(response => response.text())
  .then(resData => {
    data = JSON.parse(resData)
    console.log("Data fetched successfully!")
  })
  .catch(error => console.error('Error fetching data:', error));

const tierDisplayOrders = {
  "Collector's": 1,
  "Mad": 2,
  "Ultimate": 3,
  "Mythical": 4,
  "Legendary": 5,
  "Epic": 6,
  "Rare": 7,
  "Uncommon": 8,
  "Basic": 9,
  "Special": 10,
  "Default": 11,
}

const categoryDisplayOrders = {
  "Christmas 2021": 1,
  "New Year 2022": 2,
  "Christmas 2022": 3,
  "New Year 2023": 4,
  "Valentines 2023": 5,
  "Easter 2023": 6,
  "Summer 2023": 7,
  "Wand Series": 8,
  "Halloween 2023": 9,
  "Christmas 2023": 10,
  "New Year 2024": 11,
  "Star Series": 12,
  "Valentines 2024": 13,
  "Starter Pack": 14,
}

// i am sorry
const SortDataByKey = (data, key) => {
  const groupedData = data.reduce((acc, item) => {
     const grouping = item[key];
     let category = item["GroupName"];
     if (!acc[grouping]) {
       acc[grouping] = {};
     }
     if (!acc[grouping][category]) {
       acc[grouping][category] = [];
     }
     acc[grouping][category].push(item);
     return acc;
  }, {});
 
  return Object.keys(groupedData).map(grouping => ({
     title: grouping,
     displayOrder: tierDisplayOrders[grouping],
     categories: Object.keys(groupedData[grouping]).map(category => ({
       title: category,
       items: groupedData[grouping][category]
     })).sort((a, b) => {
       const orderA = categoryDisplayOrders[a.title] || 100;
       const orderB = categoryDisplayOrders[b.title] || 100;
       return orderA - orderB;
     })
  })).sort((a, b) => {
     const orderA = tierDisplayOrders[a.title] || 100;
     const orderB = tierDisplayOrders[b.title] || 100;
     return orderA - orderB;
  });
 };

const SortedData = SortDataByKey(data, "QualityName");

const GetTierSize = (index, cardsPerRow) => {
  const tier = SortedData[index];
  const numOfRows = tier.categories.reduce((count, category) => {
      const rowsForCategory = Math.ceil(category.items.length / cardsPerRow);
      return count + rowsForCategory;
  }, 0);
  const tierHeight = (numOfRows * cardHeight) + (tier.categories.length * categoryTitleHeight) + tierTitleHeight;
  return tierHeight;
};

const TierRow = ({ index, style }) => {
  const tier = SortedData[index];
  return (
    <div style={style} className="tier" key={tier.title}>
      <div className={`title tier-title ${tier.title.replace(/[^a-zA-Z]/g, '').toLowerCase()}`}>
        {tier.title}
      </div>
      <div className="tier-row">
        {tier.categories.map(category => (
          <Category key={category.title} title={category.title} items={category.items} />
        ))}
      </div>
    </div>
  );
};

const Category = ({ title, items }) => {
  return (
    <div className="category" key={title}>
      <div className={`title category-title`} key={title}>
        {title}
      </div>
      <div className="category-row">
        {items.map(item => (
          <Card key={item.Name + item.Type} props={item} order={item.LayoutOrder} />
        ))}
      </div>
    </div>
  )
}

export default function Display() {
  const [cardsPerRow, setCardsPerRow] = useState(3)
  const listRef = useRef(null);

  const onResize = ({width}) => {
    const newCardsPerRow = Math.floor(width / (cardWidth + (cardMargin * 2)));
    setCardsPerRow(newCardsPerRow);
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  }

  return (
    <div className="display">
      <AutoSizer onResize={onResize}>
        {({ height, width }) => (
          <List 
            ref={listRef}
            className="main-display"
            height={height}
            itemCount={SortedData.length}
            itemSize={index => GetTierSize(index, cardsPerRow)}
            width={width}
          >
            {TierRow}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
