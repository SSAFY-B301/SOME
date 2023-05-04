import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/inviteFriends.module.scss";
import BackButtonIcon from "@/public/icons/CaretLeft.svg";
import Albums from "@/components/album-starter/Albums";
import Friends from "@/components/album-starter/Friends";
import InvitedGroup from "@/components/album-starter/InvitedGroup";
import { useGetFriends, albumMutation } from "./api/inviteApi";

interface FriendType {
  id: number;
  uuid: string;
  favorite: boolean;
  profile_nickname: string;
  profile_thumbnail_image: string;
}

interface AlbumType {
  album_id: number;
  album_name: string;
  album_created_date: string;
  thumbnail_photo_url: string;
  members: string[];
}

/**
 * 친구 초대 페이지
 */
const InviteFriends = (): JSX.Element => {
  /**
   * 신규 앨범 이름, 신규 및 기존 앨범 타입 식별 쿼리
   */
  const router = useRouter(); // {albumName<string>: "", albumType<string>: "new" or "old"}
  const isNewAlbum: string | string[] | undefined = router.query.albumId;

  /**
   * 관리할 state
   */
  const [isActiveFriends, setActiveFriends] = useState<Set<number>>(new Set()); // 선택된 친구 ID 목록
  const [invitedFriends, setInvitedFriends] = useState<FriendType[]>([]); // 상단에 표시할 친구 목록
  const [inputText, setInputText] = useState<string>(""); // 검색 하고 있는 텍스트
  const [slideAnimation, setSlideAnimation] = useState<string>(""); // 친구 및 앨범 리스트 상하단 슬라이드 셋팅 값

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
   * 검색 기능
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  /**
   * 검색으로 필터링 된 친구 목록
   */
  const filterdFriends: FriendType[] = friends
    ? friends.filter((item) =>
        item.profile_nickname.toUpperCase().includes(inputText.toUpperCase())
      )
    : [];

  /**
   * 검색으로 필터링 된 앨범 목록
   */
  const filterdAlbums: AlbumType[] = albums
    ? albums.filter((item) =>
        item.album_name.toUpperCase().includes(inputText.toUpperCase())
      )
    : [];

  /**
   * 앨범 멤버 선택 기능
   */
  const selectAlbums = (ids: string[]) => {
    const tmp = new Set<number>(isActiveFriends);
    let tmpList: FriendType[] = [];
    ids.map((id) => tmp.add(Number(id)));
    setActiveFriends(tmp);
    tmp.forEach(function (value) {
      const filtered = friends.filter((friend) => friend.id == value);
      tmpList = [...filtered, ...tmpList];
    });
    setInvitedFriends(tmpList);
  };

  /**
   * 앨범 멤버 삭제 기능... 넣을 지 말지...
   */
  const removeAlbums = (ids: number[]) => {
    const tmp = new Set<number>(isActiveFriends);
    ids.map((id) => tmp.delete(id));
    setActiveFriends(tmp);
  };

  /**
   * 앨범 생성 확인 or 추가 친구 초대 확인
   */
  const { createAlbum, additionalInviteFriends } = albumMutation();

  const createAlbumClick = async () => {
    if (isNewAlbum == "") {
      const params = {
        album_name: router.query.albumName,
        invite_friend: Array.from(isActiveFriends),
      };
      createAlbum(params);
    } else {
      const params = {
        album_id: Number(isNewAlbum),
        additional_invited_friend: Array.from(isActiveFriends),
      };
      additionalInviteFriends(params);
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-white overflow-hidden"
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
            onClick={createAlbumClick}
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
