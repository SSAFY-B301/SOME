// 라이브러리
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Link from "next/link";

// 컴포넌트
import Profile from "components/common/Profile";
import Logo from "components/common/Logo";

// CSS
import styles from "styles/home.module.scss";

// 아이콘
import LightModeIcon from "public/icons/Sun.svg";
import DarkModeIcon from "public/icons/Moon.svg";
import AlarmIcon from "public/icons/Bell.svg";
import FeedBackIcon from "./feedBack";
import { useState } from "react";

interface InfoType {
  title: string;
}

function NavBar() {
  const { theme, setTheme } = useTheme();
  const [isFeed, setIsFeed] = useState<boolean>(false);
  return (
    <nav
      className={`flex flex-row justify-between items-center h-14 mx-6 ${styles.nav_bar}`}
    >
      <Logo />
      <FeedBackIcon setIsFeed={setIsFeed} isFeed={isFeed} />
      {/* 다크모드 <-> 라이트모드 전환 버튼 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <LightModeIcon
              fill="black"
              stroke="black"
              className="cursor-pointer"
            />
          ) : (
            <DarkModeIcon
              fill="white"
              stroke="white"
              className="cursor-pointer"
            />
          )}
        </button>
        <Profile />
        <Link href={"/notification"}>
          <AlarmIcon fill="grey" stroke="grey" />
        </Link>
      </div>
    </nav>
  );
}

export function InfoBar(props: InfoType) {
  const router = useRouter();
  return (
    <div
      className={
        props.title === "마이페이지"
          ? "flex items-center justify-center py-8"
          : "flex items-center justify-center py-4"
      }
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: "89.744vw" }}
      >
        <div className="absolute top-0 left-0">
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
      </div>
    </div>
  );
}

export default NavBar;
