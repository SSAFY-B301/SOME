import React, { useState, useRef } from "react";
import PlusIcon from "@/public/icons/Plus.svg";
import Link from "next/link";
import styles from "@/styles/inviteFriends.module.scss";

/**
 * 앨범 생성 페이지
 * 이슈
 * 1. 상단 바 삭제 -> 다음 페이지로 넘어가는 버튼을 중앙 혹은 접근성이 좋은 위치에 배치
 */
const AlbumCreate = (): JSX.Element => {
  /**
   * 애니메이션 관련해서 transition 공부하기
   */

  const defaultName = useRef<string>("새로운 앨범");
  const [albumName, setAlbumName] = useState<string | undefined>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAlbumName(e.target.value);
  };

  const resultName = albumName ? albumName : defaultName.current;

  return (
    <div
      className={`relative bg-pink-400 ${styles.btn}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between w-9/12 h-24">
        <span className="text-2xl text-white">앨범 제목</span>
        <input
          className="text-2xl text-white bg-inherit border-b-2 h-1/2 placeholder:italic placeholder:text-white placeholder:opacity-60"
          placeholder={defaultName.current}
          value={albumName}
          onChange={onChange}
          maxLength={8}
        ></input>
        <div className="text-lg font-thin text-white flex justify-end">
          <Link
            href={{
              pathname: "/invite",
              query: { albumId: "", albumName: resultName },
            }}
            as={`/invite`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 4.5L12.75 12L5.25 19.5"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.75 4.5L20.25 12L12.75 19.5"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 box-border flex justify-center w-full h-20 pt-2">
        <Link href={"/boy-home"}>
          <PlusIcon className="origin-center rotate-45" />
        </Link>
      </div>
    </div>
  );
};

export default AlbumCreate;
