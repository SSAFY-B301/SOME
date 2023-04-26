import Profile from "@/components/common/Profile";
import LightModeIcon from "@/public/icons/Sun.svg";
import DarkModeIcon from "@/public/icons/Moon.svg";
import AlarmIcon from "@/public/icons/Bell.svg";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import styles from "@/styles/home.module.scss";
import Link from "next/link";

function NavBar() {
  const { theme, setTheme } = useTheme();
  return (
    <nav
      className={`flex flex-row justify-between items-center h-14 mx-6 ${styles.nav_bar}`}
    >
      <Logo />
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
        <Link href={"/profile"}>
          <Profile img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60" />
        </Link>
        <Link href={"/notification"}>
          <AlarmIcon fill="grey" stroke="grey" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
