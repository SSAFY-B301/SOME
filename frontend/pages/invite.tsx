import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/inviteFriends.module.scss";
import { useRouter } from "next/router";
import BackButtonIcon from "@/public/icons/CaretLeft.svg";
import Albums from "@/components/album-starter/Albums";
import Friends from "@/components/album-starter/Friends";
import InvitedGroup from "@/components/album-starter/InvitedGroup";
import { createAlbum, useGetFriends } from "./api/inviteApi";

/**
 * 새로운 앨범에서 들어왔을 때 albumType: "new"
 * 기존 앨범에서 들어왔을 때 albumType: "old"
 */

/**
 * 앨범 더미 데이터
 */
const ALBUMS = [
  {
    id: 1,
    name: "국내 일주",
    date: "2023-04-22",
    thumbNail:
      "https://images.unsplash.com/photo-1595981234058-a9302fb97229?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWxidW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    userIds: [1, 2, 3],
  },
  {
    id: 2,
    name: "해외 일주",
    date: "2023-04-21",
    thumbNail:
      "https://images.unsplash.com/photo-1524613032530-449a5d94c285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWxidW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    userIds: [1, 3, 5],
  },
  {
    id: 3,
    name: "SSAFY 대전 2반",
    date: "2023-03-22",
    thumbNail:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFsYnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userIds: [1, 2, 4],
  },
  {
    id: 4,
    name: "자율 프로젝트",
    date: "2023-02-28",
    thumbNail:
      "https://images.unsplash.com/photo-1571502189597-d7d3a0f114fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFsYnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userIds: [3, 4, 5],
  },
  {
    id: 5,
    name: "비밀 친구",
    date: "2023-01-01",
    thumbNail:
      "https://images.unsplash.com/photo-1531777992189-ad52457fbe93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFsYnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    userIds: [4, 5, 6],
  },
];

interface FriendType {
  id: number;
  uuid: string;
  favorite: boolean;
  profile_nickname: string;
  profile_thumbnail_image: string;
}

interface AlbumType {
  id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string;
  members: number[];
}

const InviteFriends = (): JSX.Element => {
  /**
   * 신규 앨범 이름, 신규 및 기존 앨범 타입 식별 쿼리
   */
  const router = useRouter(); // {albumName: "", albumType: ""}
  const isNewAlbum: string | string[] | undefined = router.query.albumType;

  /**
   * 관리할 state
   */
  const [isActiveFriends, setActiveFriends] = useState<Set<number>>(new Set());
  const [invitedFriends, setInvitedFriends] = useState<FriendType[]>([]);
  const [inputText, setInputText] = useState<string>("");

  console.log(isActiveFriends);
  console.log(Array.from(isActiveFriends));

  /**
   * 전체 친구, 앨범 목록
   */
  const getFriends = useGetFriends();
  const friends: FriendType[] =
    getFriends.Friends?.data.data.kakao_friend_list.elements;
  const albums: AlbumType[] = getFriends.Friends?.data.data.myAlbum_member_list;

  /**
   * 친구 선택 기능
   */
  const selectFriends = (id: number) => {
    const tmpSet = new Set<number>(isActiveFriends);
    let tmpList: FriendType[] = [];
    tmpSet.add(id);
    setActiveFriends(tmpSet);
    tmpSet.forEach(function (value) {
      const filtered = friends.filter((friend) => friend.id == value);
      tmpList = [...filtered, ...tmpList];
    });
    setInvitedFriends(tmpList);
  };

  /**
   * 친구 선택 취소 기능
   */
  const removeFriends = (id: number) => {
    const tmp = new Set<number>(isActiveFriends);
    tmp.delete(id);
    const tmpList = invitedFriends.filter((friend) => friend.id != id);
    setActiveFriends(tmp);
    setInvitedFriends(tmpList);
  };

  /**
   * 검색 기능 및 필터링 리스트
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const filterdFriends: FriendType[] = friends
    ? friends.filter((item) =>
        item.profile_nickname.toUpperCase().includes(inputText.toUpperCase())
      )
    : [];

  const filterdAlbums: AlbumType[] = albums
    ? albums.filter((item) =>
        item.album_name.toUpperCase().includes(inputText.toUpperCase())
      )
    : [];

  /**
   * 앨범 멤버 선택 기능
   */
  const selectAlbums = (ids: number[]) => {
    const tmp = new Set<number>(isActiveFriends);
    let tmpList: FriendType[] = [];
    ids.map((id) => tmp.add(id));
    setActiveFriends(tmp);
    tmp.forEach(function (value) {
      const filtered = friends.filter((friend) => friend.id == value);
      tmpList = [...filtered, ...tmpList];
    });
    setInvitedFriends(tmpList);
  };

  /**
   * 앨범 멤버 삭제 기능
   */
  const removeAlbums = (ids: number[]) => {
    const tmp = new Set<number>(isActiveFriends);
    ids.map((id) => tmp.delete(id));
    setActiveFriends(tmp);
  };

  /**
   * 앨범 생성 요청
   * album_name: router.query.albumName,
    invite_friend: invited,
   */
  const { mutate } = createAlbum();

  const createAlbumClick = () => {
    const invited = Array.from(isActiveFriends);
    mutate({ album_name: router.query.albumName, invite_friend: invited });
  };

  return (
    <div
      className="flex flex-col items-center bg-white"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="flex items-center justify-center w-full h-16">
        <div className="relative w-11/12 h-full">
          <div onClick={() => router.back()}>
            <BackButtonIcon
              className="absolute left-0 text-lg text-black -translate-y-1/2 top-1/2"
              stroke={`black`}
            />
          </div>
          <span className="absolute text-2xl text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            공유 상대 초대
          </span>
          <button
            onClick={isNewAlbum == "new" ? createAlbumClick : undefined}
            className="absolute right-0 text-lg text-black -translate-y-1/2 top-1/2"
          >
            확인
          </button>
        </div>
      </div>
      <div className="flex flex-col w-11/12" style={{ height: "780px" }}>
        {invitedFriends.length > 0 ? (
          <div
            className={
              "absolute w-11/12 h-20 flex items-center box-border px-2"
            }
          >
            <InvitedGroup
              friends={invitedFriends}
              topRemoveFriends={removeFriends}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className={
            invitedFriends.length > 0
              ? `w-full flex flex-col ${styles.appearFriendDiv}`
              : `w-full flex flex-col`
          }
        >
          <input
            className="box-border w-full h-12 pl-3 mt-4 mb-2 bg-gray-100 rounded-lg"
            placeholder="친구, 앨범 검색"
            value={inputText}
            onChange={onChange}
          ></input>
          <div className="w-full overflow-y-scroll" style={{ height: 700 }}>
            <div className="box-border flex flex-col w-full mt-4 border-b-2">
              <span className="box-border mb-4 text-base">앨범으로 초대</span>
              <div className="w-full">
                {albums && inputText.length > 0 ? (
                  <Albums
                    albums={filterdAlbums}
                    isActiveFriends={isActiveFriends}
                    selectAlbums={selectAlbums}
                  />
                ) : (
                  <Albums
                    albums={albums}
                    isActiveFriends={isActiveFriends}
                    selectAlbums={selectAlbums}
                  />
                )}
              </div>
            </div>
            <div className="box-border flex flex-col w-full mt-4">
              <span className="mb-4 text-base">친구</span>
              <div className="box-border px-2 h-">
                {friends && inputText.length > 0 ? (
                  <Friends
                    friends={filterdFriends}
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
    </div>
  );
};

export default InviteFriends;
