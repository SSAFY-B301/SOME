import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButtonIcon from "@/public/icons/CaretLeft.svg";
import FavoriteAlbum from "@/components/album-starter/Albums";
import Friends from "@/components/album-starter/Friends";
import InvitedGroup from "@/components/album-starter/InvitedGroup";

/**
 * 새로운 앨범에서 들어왔을 때 albumType: "new"
 * 기존 앨범에서 들어왔을 때 albumType: "old"
 */

/**
 * 친구 더미 데이터
 */

const FRIENDS = [
  {
    id: 1,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "김동욱",
  },
  {
    id: 2,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "박서윤",
  },
  {
    id: 3,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "오태훈",
  },
  {
    id: 4,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "정상민",
  },
  {
    id: 5,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "차현경",
  },
  {
    id: 6,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "최현인",
  },
  {
    id: 7,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "정상민",
  },
  {
    id: 8,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "차현경",
  },
  {
    id: 9,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "최현인",
  },
  {
    id: 10,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "차현경",
  },
  {
    id: 11,
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "최현인",
  },
];

interface FriendType {
  id: number;
  profileImg: string;
  name: string;
}

const InviteFriendsPage = (): JSX.Element => {
  const router = useRouter();
  console.log(router.query);
  const [friends, setFriends] = useState<FriendType[]>([]);
  const [isActiveFriends, setActiveFriends] = useState<number[]>([]);
  const [invitedGroup, setInviteGroup] = useState<FriendType[]>([]);
  const [friendName, setFriendName] = useState<string>("");

  useEffect(() => {
    setFriends(FRIENDS);
  }, []);

  /**
   * 친구 선택 기능
   */
  const selectFriends = (id: number) => {
    const friend = friends.filter((item) => item.id == id);
    setActiveFriends([...isActiveFriends, id]);
    setInviteGroup([...invitedGroup, ...friend]);
  };

  /**
   * 친구 선택 취소 기능
   */
  const removeFriends = (id: number) => {
    const friendId = isActiveFriends.filter((item) => item != id);
    const friend = invitedGroup.filter((item) => item.id != id);
    setActiveFriends(friendId);
    setInviteGroup(friend);
  };

  /**
   * 상단부 친구 선택 취소 기능
   */
  const topRemoveFriends = (id: number) => {
    const friendId = isActiveFriends.filter((item) => item != id);
    const friend = invitedGroup.filter((item) => item.id != id);
    setActiveFriends(friendId);
    setInviteGroup(friend);
  };

  /**
   * 검색 기능
   * 검색 중일 땐 filterd를, 그렇지 않을 땐 friends를 props로 전달
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFriendName(e.target.value);
  };

  const filterd = friends.filter((item) =>
    item.name.toUpperCase().includes(friendName.toUpperCase())
  );

  /**
   * 앨범 목록 추후 수정 필요
   */

  /**
   * 확인 누를 시 router.query.albumName, invitedGroup으로 앨범 생성 요청
   * 메인 페이지로 이동하도록 설정, 추후 페이지 주소 변동 필요
   */

  return (
    <div
      className="bg-white flex flex-col items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="w-full h-16 flex justify-center items-center">
        <div className="w-11/12 h-full relative">
          <div onClick={() => router.back()}>
            <BackButtonIcon
              className="absolute top-1/2 -translate-y-1/2 left-0 text-black text-lg"
              stroke={`black`}
            />
          </div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-2xl">
            공유 상대 초대
          </span>
          <Link
            className="absolute top-1/2 -translate-y-1/2 right-0 text-black text-lg"
            href="/"
          >
            확인
          </Link>
        </div>
      </div>
      <div className="w-11/12 flex flex-col" style={{ height: "780px" }}>
        {invitedGroup.length > 0 ? (
          <div className="w-full h-20 flex items-center box-border px-2">
            <InvitedGroup
              group={invitedGroup}
              topRemoveFriends={topRemoveFriends}
            />
          </div>
        ) : (
          <div></div>
        )}
        <input
          className="w-full h-12 bg-gray-100 rounded-lg box-border pl-3 mt-4 mb-2"
          placeholder="친구, 앨범 검색"
          value={friendName}
          onChange={onChange}
        ></input>
        <div className="w-full overflow-y-scroll" style={{ height: 700 }}>
          <div className="w-full h-44 box-border mt-4 border-b-2 flex flex-col">
            <span className="box-border mb-4 text-base">앨범으로 초대</span>
            <div className="w-full">
              <FavoriteAlbum />
            </div>
          </div>
          <div className="w-full box-border mt-4 flex flex-col">
            <span className="text-base mb-4">친구</span>
            <div className="h- box-border px-2">
              {friendName.length > 0 ? (
                <Friends
                  friends={filterd}
                  isActiveFriends={isActiveFriends}
                  selectFriends={selectFriends}
                  removeFriends={removeFriends}
                />
              ) : (
                <Friends
                  friends={friends}
                  isActiveFriends={isActiveFriends}
                  selectFriends={selectFriends}
                  removeFriends={removeFriends}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsPage;
