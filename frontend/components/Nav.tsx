import Profile from "@/components/Profile";
import LightModeIcon from "@/public/icon/Sun.svg";
import DarkModeIcon from "@/public/icon/Moon.svg";
import AlarmIcon from "@/public/icon/Bell.svg";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import Link from "next/link";

function NavBar() {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flex flex-row items-center justify-between mx-6 h-14">
      <Logo />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          // 클릭시 다크모드면 라이트로 바꿈
          className={`animate-pulse`}
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
        <Link href={"/login"}>
          <Profile img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60" />
        </Link>
        <AlarmIcon fill="grey" stroke="grey" />
      </div>
    </nav>
  );
}

export default NavBar;
