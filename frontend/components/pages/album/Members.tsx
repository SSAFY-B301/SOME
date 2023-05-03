// 라이브러리
import React, { useEffect, useState } from "react";
import Link from "next/link";

// CSS
import styles from "styles/album.module.scss";

// 아이콘
import PlusIcon from "public/icons/PlusMainColor.svg";
import { useGetDetail } from "@/pages/api/albumApi";
import { useRouter } from "next/router";

// 인터페이스
interface MembersType {
  selectMembers: Set<number>;
  setSelectMembers: React.Dispatch<React.SetStateAction<Set<number>>>;
  membersId: number[];
}

/**
 * 앨범의 멤버들 컴포넌트
 * @param members 멤버 리스트
 * @param selectMembers 선택된 멤버가 저장되는 Set
 * @param setSelectMembers 선택된 멤버가 저장되는 Set의 Setter 함수
 * @param membersSize 멤버 수
 * @param membersId 멤버들의 id
 * @returns
 */
function Members({ selectMembers, setSelectMembers, membersId }: MembersType) {
  const router = useRouter();

  const albumId: number = Number(router.query.album_id);
  const { getDetail, getDetailIsLoading } = useGetDetail(albumId);
  const [membersSize, setMembersSize] = useState<number>(membersId.length);

  useEffect(() => {
    setMembersSize(membersId.length);
  }, [membersId]);

  /**
   * 멤버 선택값 변경
   * @param id 멤버 id
   */
  const changeSelect = (id: number) => {
    selectMembers.size === membersSize && selectMembers.clear();
    selectMembers.has(id) ? selectMembers.delete(id) : selectMembers.add(id);
    selectMembers.size === 0
      ? setSelectMembers(new Set(membersId))
      : setSelectMembers(new Set(selectMembers));
  };

  /**
   * 멤버 리스트 랜더
   */
  const membersSection: React.ReactNode = getDetailIsLoading ? (
    // TODO : 로딩
    <></>
  ) : (
    getDetail &&
    getDetail.members.map((member) => (
      <div
        key={member.id}
        onClick={() => {
          changeSelect(member.id);
        }}
        className={`${styles.member} ${
          selectMembers.has(member.id)
            ? styles.select_member
            : styles.no_select_member
        }`}
        style={{
          backgroundImage: "url(" + member.profile_img_url + ")",
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