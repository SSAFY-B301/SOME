import React from "react";

interface CardType {
  children: React.ReactElement;
  width: string;
  height: string;
  radius: string;
  img: string;
}

function Card({ children, width, height, radius, img }: CardType) {
  return (
    <div
      className="bg-white flex-col p-4"
      style={{
        width: width,
        height: height,
        borderRadius: radius,
        backgroundImage: "url(" + img + ")",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
