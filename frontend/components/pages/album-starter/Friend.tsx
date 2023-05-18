import React, { useState, useEffect } from "react";
import styles from "@/styles/inviteFriends.module.scss";

interface FriendType {
  id: number;
  uuid: string;
  favorite: boolean;
  profile_nickname: string;
  profile_thumbnail_image: string;
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
  const [thumbnailImg, setThumbnailImg] = useState<string>(
    friend.profile_thumbnail_image
  );

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

  const onErrorImg = () => {
    setThumbnailImg("/images/default_thumbnail.png");
  };

  return (
    <li className="h-16 flex justify-between items-center" onClick={select}>
      <div className="w-2/3 flex justify-start items-center">
        <img
          src={thumbnailImg}
          alt=""
          onError={onErrorImg}
          className="w-12 h-12 rounded-full box-border mr-3"
        />
        <div className="text-base truncate">{friend.profile_nickname}</div>
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
          stroke={isActive ? "white" : "none"}
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
