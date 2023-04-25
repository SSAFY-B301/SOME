import React, { useState, useRef } from "react";
import PlusIcon from "@/public/icons/Plus.svg";
import Link from "next/link";

const SetAlbumNamePage = (): JSX.Element => {
  const defaultName = useRef<string>("새로운 앨범");
  const [albumName, setAlbumName] = useState<string | undefined>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAlbumName(e.target.value);
  };

  const resultName = albumName ? albumName : defaultName.current;

  return (
    <div className="w-screen h-screen bg-pink-400 flex flex-col justify-between items-center">
      <div className="w-11/12 h-12 relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
          새로운 앨범 생성
        </span>
        <Link
          className="absolute top-1/2 -translate-y-1/2 right-0 text-white opacity-60 text-lg font-thin"
          href={{
            pathname: "/album-starter/InviteFriendsPage",
            query: { albumName: resultName, albumType: "new" },
          }}
          as={`/album-starter/InviteFriendsPage`}
        >
          다음
        </Link>
      </div>
      <div className="w-9/12 h-24 flex flex-col justify-between">
        <span className="text-white text-3xl">앨범 제목</span>
        <input
          className="h-1/2 bg-pink-400 border-b-2 text-3xl text-white placeholder:italic placeholder:text-white placeholder:opacity-60"
          placeholder={defaultName.current}
          value={albumName}
          onChange={onChange}
        ></input>
      </div>
      <div className="w-full h-20 box-border pt-2 flex justify-center">
        <Link href={"/"}>
          <PlusIcon className="origin-center rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default SetAlbumNamePage;
