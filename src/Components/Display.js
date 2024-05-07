import React, { useState, useRef  } from 'react'
import { VariableSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import Card from './Card'
import './Display.css'
import { processData } from './Data.js'

let SortedData = []
processData().then((data) => {
  SortedData = data.SortedData
}).catch(error => {
  console.error('Error processing data:', error);
});

const cardMargin = 3
const cardWidth = 300 + (cardMargin * 2)
const cardHeight = 180 + (cardMargin * 2)
//const rowSidePadding = 20
const tierTitleHeight = 120
const categoryTitleHeight = 40

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
