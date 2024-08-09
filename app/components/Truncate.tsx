// TruncateText.js
import React from 'react';

const TruncateText = ({ itemName }:any) => {
  const truncated = itemName.length > 20 ? itemName.slice(0, 20) + '...' : itemName;

  return <span>{truncated}</span>;
};

export default TruncateText;
