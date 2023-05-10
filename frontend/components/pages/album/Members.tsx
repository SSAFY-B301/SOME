// 라이브러리
import React, { useEffect, useState } from "react";
import Link from "next/link";

// CSS
import styles from "styles/album.module.scss";

// 아이콘
import PlusIcon from "public/icons/PlusMainColor.svg";
import { useGetDetail } from "@/pages/api/albumApi";
import { LoadingProfile } from "@/components/common/Loading";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import {
  addUserIdState,
  clearUserIdState,
  deleteUserIdState,
  setUserIdState,
} from "@/features/albumStatusSlice";

// 인터페이스
interface MembersType {
  membersId: number[];
  isAlbumLoading: () => boolean;
}

/**
 * 앨범의 멤버들 컴포넌트
 * @param members 멤버 리스트
 * @param membersSize 멤버 수
 * @param membersId 멤버들의 id
 * @returns
 */
function Members({ membersId, isAlbumLoading }: MembersType) {
  const dispatch = useDispatch();
  const albumId = useSelector((state: StateType) => state.albumStatus.albumId);

  const userId = useSelector((state: StateType) => state.albumStatus.userId);

  useEffect(() => {
    console.log("USER", userId);
  }, [userId]);

  const { getDetail } = useGetDetail(albumId);
  const [membersSize, setMembersSize] = useState<number>(membersId.length);

  useEffect(() => {
    setMembersSize(membersId.length);
  }, [membersId]);

  /**
   * 멤버 선택값 변경
   * @param id 멤버 id
   */
  const changeSelect = (id: number) => {
    userId.size === membersSize &&
      dispatch(clearUserIdState({ userId: new Set() }));
    // userId.has(id)
    //   ? dispatch(deleteUserIdState(id))
    //   : dispatch(addUserIdState(id));
    // userId.size === 0
    //   ? dispatch(setUserIdState({ userId: new Set(membersId) }))
    //   : dispatch(setUserIdState({ userId: userId }));
  };

  /**
   * 멤버 리스트 랜더
   */
  const membersSection: React.ReactNode = isAlbumLoading() ? (
    // TODO : 로딩
    <>
      {[...Array(3)].map((_, i) => (
        <LoadingProfile key={i} />
      ))}
    </>
  ) : (
    getDetail &&
    getDetail.members.map((member) => (
      <div
        key={member.id}
        onClick={() => {
          changeSelect(member.id);
        }}
        className={`${styles.member} ${
          userId.has(member.id) ? styles.select_member : styles.no_select_member
        }`}
        style={{
          backgroundImage: `url(${member.profile_img_url})`,
        }}
      ></div>
    ))
  );
  //
  return (
    <section className={`${styles.members}`}>
      {membersSection}
      {/* 새로운 멤버 초대하러 가기 */}
      <Link
        href={{
          pathname: "/invite",
          query: { albumId: albumId, members: membersId },
        }}
        as="친구초대"
      >
        <PlusIcon width="6.154vw" height="6.154vw" />
      </Link>
    </section>
  );
}

export default Members;
