import React from "react";
import DownloadIcon from "public/icons/DownloadSimple.svg";
import TrashIcon from "public/icons/Trash.svg";
import ThumbnailIcon from "public/icons/Image.svg";

interface Props {
  clickDownload(): void;
  clickDelete(): void;
  clickThumbnail(): void;
  theme: string | undefined;
}

/**
 * 사진 상세보기 하단네비 컴포넌트
 */

const Footer = ({
  clickDownload,
  clickDelete,
  clickThumbnail,
  theme,
}: Props): JSX.Element => {
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
        onClick={clickThumbnail}
      >
        <ThumbnailIcon
          width={"28px"}
          height={"28px"}
          fill={"white"}
          stroke={"black"}
        />
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
