import React, { useState } from "react";
import styles from "@/styles/inviteFriends.module.scss";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  friend: FriendType;
  topRemoveFriends(id: number): void;
}

const InvitedFriend = ({ friend, topRemoveFriends }: Props): JSX.Element => {
  const [appearAnimation, setAppearAnimation] = useState<string>(
    `${styles.appearIcon}`
  );

  const select = () => {
    setAppearAnimation(`${styles.disappearIcon}`);
    setTimeout(() => {
      topRemoveFriends(friend.id);
    }, 200);
  };

  return (
    <li
      className={`flex flex-col items-center ${appearAnimation}`}
      onClick={select}
    >
      <div className="w-14 h-14 mb-2 relative">
        <button className="absolute z-10 top-0 right-0 w-5 h-5 bg-gray-400 rounded-full flex justify-center items-center">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={friend.profileImg}
          alt="img"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 rounded-full"
        />
      </div>
      <span className="text-xs">{friend.name}</span>
    </li>
  );
};

export default InvitedFriend;
