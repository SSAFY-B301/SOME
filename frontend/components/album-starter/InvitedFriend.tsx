import React from "react";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

interface Props {
  friend: FriendType;
}

const InvitedFriend = ({ friend }: Props): JSX.Element => {
  return (
    <li className="flex flex-col items-center">
      <div className="w-14 h-14 mb-2 relative">
        <button className="absolute z-10 top-0 right-0 w-5 h-5 bg-gray-400 rounded-full"></button>
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
