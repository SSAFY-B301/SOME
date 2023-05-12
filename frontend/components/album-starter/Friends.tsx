import React from "react";
import Friend from "./Friend";
import {
  LoadingInviteFriendThumbnail,
  LoadingInviteFriendBtn,
} from "../common/Loading";
import styles from "styles/inviteFriends.module.scss";
import ShareIcon from "public/icons/KakaoTalk.svg";
import { shareUrl } from "../pages/album/Share";

interface FriendType {
  id: number;
  uuid: string;
  favorite: boolean;
  profile_nickname: string;
  profile_thumbnail_image: string;
}

interface Props {
  friends: FriendType[];
  isActiveFriends: Set<Number>;
  selectFriends(id: number): void;
  removeFriends(id: number): void;
}

const Friends = ({
  friends,
  isActiveFriends,
  selectFriends,
  removeFriends,
}: Props): JSX.Element => {
  return (
    <div>
      {friends ? (
        friends.length > 0 ? (
          <ul>
            <li
              className="h-16 flex justify-between items-center"
              onClick={shareUrl}
            >
              <div className="w-2/3 flex justify-start items-center">
                <div className="w-12 h-12 rounded-full box-border mr-3">
                  <ShareIcon className="w-12 h-12 rounded-full box-border mr-3" />
                </div>
                <div className="text-base truncate">
                  <span className={`font-bold ${styles.share}`}>
                    친구에게 SOME 초대하기
                  </span>
                </div>
              </div>
            </li>
            {friends.map((friend) => (
              <Friend
                key={friend.id}
                friend={friend}
                isActiveFriends={isActiveFriends}
                selectFriends={selectFriends}
                removeFriends={removeFriends}
              />
            ))}
          </ul>
        ) : (
          <div>친구가 없다</div>
        )
      ) : (
        <div>
          <div className="h-16 flex justify-between items-center">
            <div className="w-2/3 flex justify-start items-center">
              <LoadingInviteFriendThumbnail />
            </div>
            <LoadingInviteFriendBtn />
          </div>
          <div className="h-16 flex justify-between items-center">
            <div className="w-2/3 flex justify-start items-center">
              <LoadingInviteFriendThumbnail />
            </div>
            <LoadingInviteFriendBtn />
          </div>
          <div className="h-16 flex justify-between items-center">
            <div className="w-2/3 flex justify-start items-center">
              <LoadingInviteFriendThumbnail />
            </div>
            <LoadingInviteFriendBtn />
          </div>
          <div className="h-16 flex justify-between items-center">
            <div className="w-2/3 flex justify-start items-center">
              <LoadingInviteFriendThumbnail />
            </div>
            <LoadingInviteFriendBtn />
          </div>
          <div className="h-16 flex justify-between items-center">
            <div className="w-2/3 flex justify-start items-center">
              <LoadingInviteFriendThumbnail />
            </div>
            <LoadingInviteFriendBtn />
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
