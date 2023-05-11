import React from "react";
import DownloadIcon from "public/icons/DownloadSimple.svg";
import TrashIcon from "public/icons/Trash.svg";
import ThumbnailIcon from "public/icons/Image.svg";

interface Props {
  clickDownload(): void;
  clickDelete(): void;
  clickVote(): void;
  clickThumbnail(): void;
  theme: string | undefined;
}

/**
 * 사진 상세보기 하단네비 컴포넌트
 */

const Footer = ({
  clickDownload,
  clickDelete,
  clickVote,
  clickThumbnail,
  theme,
}: Props): JSX.Element => {
  /**
   * 공유 요청 알림 기능 추가
   */

  /**
   * 사진 삭제 기능 추가
   */

  return (
    <div className="flex items-center justify-between w-full h-full">
      <div
        className="flex flex-col items-center justify-center"
        onClick={clickDownload}
      >
        <DownloadIcon stroke={theme == "light" ? "black" : "white"} />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={clickVote}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="box-border w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={clickThumbnail}
      >
        <ThumbnailIcon width={"28px"} height={"28px"} fill={"white"} />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={clickDelete}
      >
        <TrashIcon stroke={theme == "light" ? "black" : "white"} />
      </div>
    </div>
  );
};

export default Footer;
