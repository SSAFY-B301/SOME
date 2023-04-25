import React from "react";
import InvitedFriend from "./InvitedFriend";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  group: FriendType[];
}

const InvitedGroup = ({ group }: Props): JSX.Element => {
  return (
    <ul className="flex gap-4 overflow-scroll">
      {group.map((friend) => (
        <InvitedFriend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
};

export default InvitedGroup;
