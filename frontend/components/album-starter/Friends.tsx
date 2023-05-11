import React from "react";
import Friend from "./Friend";
import {
  LoadingInviteFriendThumbnail,
  LoadingInviteFriendBtn,
} from "../common/Loading";

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
