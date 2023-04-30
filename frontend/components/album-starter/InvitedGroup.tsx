import React from "react";
import InvitedFriend from "./InvitedFriend";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  friends: FriendType[];
  topRemoveFriends(id: number): void;
}

const InvitedGroup = ({ friends, topRemoveFriends }: Props): JSX.Element => {
  return (
    <ul className="flex gap-4 overflow-scroll">
      {friends.map((friend) => (
        <InvitedFriend
          key={friend.id}
          friend={friend}
          topRemoveFriends={topRemoveFriends}
        />
      ))}
    </ul>
  );
};

export default InvitedGroup;
