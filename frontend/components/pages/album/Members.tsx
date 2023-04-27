import React from "react";
import styles from "@/styles/album.module.scss";

import PlusIcon from "@/public/icons/PlusMainColor.svg";
import Link from "next/link";

interface MembersType {
  albumId: number;
  members: MemberType[];
  selectMembers: Set<number>;
  setSelectMembers: React.Dispatch<React.SetStateAction<Set<number>>>;
  membersSize: number;
  membersId: number[];
}

interface MemberType {
  id: number;
  name: string;
  img: string;
}

function Members({
  albumId,
  members,
  selectMembers,
  setSelectMembers,
  membersSize,
  membersId,
}: MembersType) {
  const changeSelect = (id: number) => {
    selectMembers.size === membersSize && selectMembers.clear();
    selectMembers.has(id) ? selectMembers.delete(id) : selectMembers.add(id);
    selectMembers.size === 0
      ? setSelectMembers(new Set(membersId))
      : setSelectMembers(new Set(selectMembers));
  };
  const membersSection: React.ReactNode = members.map((member: MemberType) => (
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
      style={{ backgroundImage: "url(" + member.img + ")" }}
    ></div>
  ));
  return (
    <section className={`${styles.members}`}>
      {membersSection}
      <Link href="/album-starter/InviteFriendsPage" as="친구초대">
        <PlusIcon width="6.154vw" height="6.154vw" />
      </Link>
    </section>
  );
}

export default Members;
