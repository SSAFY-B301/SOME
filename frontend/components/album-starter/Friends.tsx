import React from "react";
import Friend from "./Friend";

interface FriendType {
  id: string;
  profileImg: string;
  name: string;
}

interface Props {
  friends: FriendType[];
}

const Friends = ({ friends }: Props): JSX.Element => {
  return (
    <div>
      {friends ? (
        <ul>
          {friends.map((friend) => (
            <Friend key={friend.id} friend={friend} />
          ))}
        </ul>
      ) : (
        <div>친구가 없어요...</div>
      )}
    </div>
  );
};

export default Friends;
