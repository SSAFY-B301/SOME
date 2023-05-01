import React from "react";
import Friend from "./Friend";

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
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
        <div>친구가 없어요...</div>
      )}
    </div>
  );
};

export default Friends;
