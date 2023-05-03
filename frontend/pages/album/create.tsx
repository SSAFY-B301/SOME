import React, { useState, useRef } from "react";
import PlusIcon from "@/public/icons/Plus.svg";
import Link from "next/link";

const AlbumCreate = (): JSX.Element => {
  const defaultName = useRef<string>("새로운 앨범");
  const [albumName, setAlbumName] = useState<string | undefined>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAlbumName(e.target.value);
  };

  const resultName = albumName ? albumName : defaultName.current;

  return (
    <div
      className="flex flex-col items-center justify-between bg-pink-400 "
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="flex items-center justify-center w-full h-16">
        <div className="relative w-11/12 h-12">
          <span className="absolute text-2xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap">
            새로운 앨범 생성
          </span>
          <Link
            className="absolute right-0 text-lg font-thin text-white -translate-y-1/2 top-1/2"
            href={{
              pathname: "/invite",
              query: { albumName: resultName, albumType: "new" },
            }}
            as={`/invite`}
          >
            다음
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between w-9/12 h-24">
        <span className="text-3xl text-white">앨범 제목</span>
        <input
          className="text-3xl text-white bg-pink-400 border-b-2 h-1/2 placeholder:italic placeholder:text-white placeholder:opacity-60"
          placeholder={defaultName.current}
          value={albumName}
          onChange={onChange}
          maxLength={8}
        ></input>
      </div>
      <div className="box-border flex justify-center w-full h-20 pt-2">
        <Link href={"/"}>
          <PlusIcon className="origin-center rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default AlbumCreate;
