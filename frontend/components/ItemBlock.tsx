import React from "react";

interface ItemBlockType {
  children: React.ReactElement;
  width: string;
  height: string;
  radius: string;
}

function ItemBlock({ children, width, height, radius }: ItemBlockType) {
  return (
    <div
      className="bg-white dark:bg-dark-block"
      style={{ width: width, height: height, borderRadius: radius }}
    >
      {children}
    </div>
  );
}

export default ItemBlock;
