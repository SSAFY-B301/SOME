import React, { useState } from "react";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  friend: FriendType;
  inviteFriends(id: number): void;
  removeFriends(id: number): void;
}

const Friend = ({
  friend,
  inviteFriends,
  removeFriends,
}: Props): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const select = () => {
    if (isActive == false) {
      setIsActive(true);
      inviteFriends(friend.id);
    } else {
      setIsActive(false);
      removeFriends(friend.id);
    }
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
