import React, { useState } from "react";
import { useRouter } from "next/router";
import CaretLeft from "@/public/icons/CaretLeft.svg";
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
    id: "1",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "김동욱",
  },
  {
    id: "2",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "박서윤",
  },
  {
    id: "3",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "오태훈",
  },
  {
    id: "4",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "정상민",
  },
  {
    id: "5",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "차현경",
  },
  {
    id: "6",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "최현인",
  },
];

const INVITEDGROUP = [
  {
    id: "1",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "김동욱",
  },
  {
    id: "2",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "박서윤",
  },
  {
    id: "3",
    profileImg:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    name: "오태훈",
  },
];

interface FriendType {
  id: string;
  profileImg: string;
  name: string;
}

const InviteFriendsPage = (): JSX.Element => {
  const router = useRouter();
  console.log(router.query);

  const [invitedGroup, setInviteGroup] = useState<FriendType[]>(INVITEDGROUP);

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <div className="w-11/12 h-12 relative">
        <div onClick={() => router.back()}>
          <CaretLeft className="absolute top-1/2 -translate-y-1/2 left-0 text-black text-lg" />
        </div>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-2xl">
          공유 상대 초대
        </span>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 text-black text-lg">
          확인
        </div>
      </div>
      <div className="w-11/12 flex flex-col justify-between">
        {invitedGroup ? (
          <div className="w-full h-20 flex items-center box-border mt-4 px-2">
            <InvitedGroup group={invitedGroup} />
          </div>
        ) : (
          <div></div>
        )}
        <input
          className="w-full h-12 bg-gray-100 rounded-lg box-border pl-3 mt-4"
          placeholder="친구, 앨범 검색"
        ></input>
        <div className="w-full h-44 box-border mt-4 border-b-2 flex flex-col">
          <span className="box-border mb-4 text-base">앨범으로 초대</span>
          <div className="w-full">
            <FavoriteAlbum />
          </div>
        </div>
        <div className="w-full box-border mt-4 flex flex-col">
          <span className="text-base mb-4">친구</span>
          <div className="box-border px-2">
            <Friends friends={FRIENDS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsPage;
