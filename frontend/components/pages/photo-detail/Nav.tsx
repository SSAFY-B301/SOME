import React from "react";
import { useRouter } from "next/router";
import { UploadStatus } from "../../common/UploadStatus";

interface InfoType {
  title: string;
}

const Nav = (props: InfoType) => {
  const router = useRouter();

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute h-full top-0 left-0 flex items-center justify-center">
        <button onClick={() => router.back()}>
          <svg
            width="6.154vw"
            height="6.154vw"
            viewBox="0 0 24 24"
            fill="none"
            stroke="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="stroke-black dark:stroke-white"
              d="M15 19.5L7.5 12L15 4.5"
              stroke="transparent"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p className="text-xl text-center">{props.title}</p>
      <div className="absolute right-0">
        <UploadStatus />
      </div>
    </div>
  );
};

export default Nav;
