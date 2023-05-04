import React from "react";
import InvitedFriend from "./InvitedFriend";

interface FriendType {
  id: number;
  uuid: string;
  favorite: boolean;
  profile_nickname: string;
  profile_thumbnail_image: string;
}

interface Props {
  friends: FriendType[];
  topRemoveFriends(id: number): void;
}

const InvitedGroup = ({ friends, topRemoveFriends }: Props): JSX.Element => {
  return (
    <div className="flex flex-nowrap gap-4 overflow-scroll">
      {friends.map((friend) => (
        <InvitedFriend
          key={friend.id}
          friend={friend}
          topRemoveFriends={topRemoveFriends}
        />
      ))}
    </div>
  );
};

export default InvitedGroup;
