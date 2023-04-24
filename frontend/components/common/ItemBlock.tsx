import React from "react";

interface ItemBlockType {
  children: React.ReactElement;
  width: string;
  height: string;
  radius: string;
}

/**
 * 홈에서 사용하는 블록(흰색) 컴포넌트
 * @param {React.ReactElement} children
 * @param {string} width
 * @param {string} height
 * @param {string} radius
 * @returns
 */
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
