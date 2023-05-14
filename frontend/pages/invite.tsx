import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/inviteFriends.module.scss";
import BackButtonIcon from "@/public/icons/CaretLeft.svg";
import Albums from "@/components/album-starter/Albums";
import Friends from "@/components/album-starter/Friends";
import InvitedGroup from "@/components/album-starter/InvitedGroup";
import { useGetFriends, albumMutation } from "./api/inviteApi";
import { useTheme } from "next-themes";
import AlertModal from "@/components/album-starter/AlertModal";

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
 * 이슈
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
  const [slideAnimation, setSlideAnimation] = useState<string>(
    styles.slide_container
  ); // 친구 및 앨범 리스트 상하단 슬라이드 셋팅 값
  const [alert, setAlert] = useState<boolean>(false); // 확인 버튼 중복 클릭 방지 모달 여부
  const { theme, setTheme } = useTheme(); // 다크 모드 판별 값

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
    setSlideAnimation(styles.appearFriendDiv);
    setInvitedFriends(tmpList);
  };

  /**
   * 친구 선택 취소 기능
   */
  const removeFriends = (id: number) => {
    const tmp = new Set<number>(isActiveFriends);
    tmp.delete(id);
    setActiveFriends(tmp);
    const tmpList = invitedFriends.filter((friend) => friend.id != id);
    if (tmp.size > 0) {
      setInvitedFriends(tmpList);
    } else {
      setInvitedFriends(tmpList);
      setSlideAnimation(styles.disappearFriendDiv);
      setTimeout(() => {
        setSlideAnimation(styles.slide_container);
      }, 300);
    }
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
    setSlideAnimation(styles.appearFriendDiv);
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
    setAlert(true);

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
      className="flex flex-col items-center bg-white dark:bg-black overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className={`flex items-center justify-center ${styles.nav_bar} box-border p-4`}
      >
        <div className="relative w-full h-full flex justify-between items-center">
          <div onClick={() => router.back()}>
            <BackButtonIcon
              className="text-lg text-black"
              stroke={theme == "light" ? `black` : `white`}
            />
          </div>
          <span
            className="text-black dark:text-white"
            style={{ fontSize: "5.128vw" }}
          >
            공유 상대 초대
          </span>
          <button
            onClick={createAlbumClick}
            className="text-black dark:text-white"
            style={{ fontSize: "4.103vw" }}
          >
            확인
          </button>
        </div>
      </div>
      <div
        className={`w-full flex flex-col items-center ${styles.main_container}`}
      >
        {invitedFriends.length > 0 && (
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
        )}
        <div className={`w-11/12 flex flex-col ${slideAnimation}`}>
          <input
            className="box-border w-full h-12 pl-3 mt-4 mb-2 bg-gray-100 dark:bg-dark-block dark:placeholder:text-white rounded-lg"
            placeholder="친구, 앨범 검색"
            value={inputText}
            onChange={onChange}
          ></input>
          <div
            className={`w-full flex flex-col overflow-hidden overflow-y-scroll ${styles.friends_container}`}
          >
            <div className="w-full box-border flex flex-col mt-4 border-b-2">
              <span className="box-border mb-2 text-base">앨범으로 초대</span>
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
      {alert && <AlertModal />}
    </div>
  );
};

export default InviteFriends;
