import React, { useState } from "react";

interface FriendType {
  id: string;
  profileImg: string;
  name: string;
}

interface Props {
  friend: FriendType;
}

const Friend = ({ friend }: Props): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const select = () => {
    setIsActive((prev) => (prev ? false : true));
  };

  return (
    <li className="h-16 flex justify-between items-center">
      <div className="w-2/6 flex justify-between items-center">
        <img
          src={friend.profileImg}
          alt="img"
          className="w-12 h-12 border-2 rounded-full"
        />
        <div className="text-base">{friend.name}</div>
      </div>
      <button
        className={
          isActive
            ? `w-6 h-6 bg-pink-400 border-2 rounded-full`
            : `w-6 h-6 border-2 rounded-full`
        }
        onClick={select}
      />
    </li>
  );
};

export default Friend;
