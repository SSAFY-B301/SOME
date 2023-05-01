import React, { useState, useEffect } from "react";
import styles from "@/styles/inviteFriends.module.scss";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  friend: FriendType;
  isActiveFriends: Set<Number>;
  selectFriends(id: number): void;
  removeFriends(id: number): void;
}

const Friend = ({
  friend,
  isActiveFriends,
  selectFriends,
  removeFriends,
}: Props): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActiveFriends.has(friend.id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const select = () => {
    if (isActive == false) {
      selectFriends(friend.id);
    } else {
      removeFriends(friend.id);
    }
  };

  return (
    <li className="h-16 flex justify-between items-center" onClick={select}>
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
            ? `w-6 h-6 border-2 rounded-full flex justify-center items-center ${styles.btn}`
            : `w-6 h-6 border-2 rounded-full flex justify-center items-center`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="5"
          stroke="white"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </button>
    </li>
  );
};

export default Friend;
