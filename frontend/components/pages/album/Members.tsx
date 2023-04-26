import React from "react";
import styles from "@/styles/album.module.scss";

import PlusIcon from "@/public/icons/PlusMainColor.svg";

interface MembersType {
  albumId: number;
  members: MemberType[];
}

interface MemberType {
  id: number;
  name: string;
  img: string;
}

function Members({ albumId, members }: MembersType) {
  const membersSection: React.ReactNode = members.map((member: MemberType) => (
    <div
      key={member.id}
      className={`${styles.member}`}
      style={{ backgroundImage: "url(" + member.img + ")" }}
    ></div>
  ));
  return (
    <section className={`${styles.members}`}>
      {membersSection}
      <PlusIcon width="6.154vw" height="6.154vw" />
    </section>
  );
}

export default Members;
