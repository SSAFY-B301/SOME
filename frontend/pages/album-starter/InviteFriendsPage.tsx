import React from "react";
import { useRouter } from "next/router";

const InviteFriendsPage = (): JSX.Element => {
  const router = useRouter();
  console.log(router.query);

  return <div>친구 초대 페이지</div>;
};

export default InviteFriendsPage;
