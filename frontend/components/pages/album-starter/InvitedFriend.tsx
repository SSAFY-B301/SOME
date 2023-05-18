import React, { useState } from "react";
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
  topRemoveFriends(id: number): void;
}

const InvitedFriend = ({ friend, topRemoveFriends }: Props): JSX.Element => {
  const [thumbnailImg, setThumbnailImg] = useState<string>(
    friend.profile_thumbnail_image
  );
  const [appearAnimation, setAppearAnimation] = useState<string>(
    `${styles.appearIcon}`
  );
  const [sliderAnimation, setSliderAnimation] = useState<string>(
    `${styles.appearIconDiv}`
  );

  const select = () => {
    setAppearAnimation(`${styles.disappearIcon}`);
    setTimeout(() => {
      topRemoveFriends(friend.id);
    }, 300);
  };

  const onErrorImg = () => {
    setThumbnailImg("/images/default_thumbnail.png");
  };

  return (
    <div className={`w-14 h-20 box-border ${sliderAnimation}`} onClick={select}>
      <div
        className={`w-14 h-full flex flex-col items-center ${appearAnimation}`}
      >
        <div className={`w-14 h-14 relative`}>
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
            src={thumbnailImg}
            alt="img"
            onError={onErrorImg}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 dark:border-0 rounded-full"
          />
        </div>
        <span className="w-14 text-xs truncate flex justify-center">
          {friend.profile_nickname}
        </span>
      </div>
    </div>
  );
};

export default InvitedFriend;
