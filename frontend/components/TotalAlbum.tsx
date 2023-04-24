import styles from "@/styles/style.module.scss";
import SearchIcon from "@/public/icon/MagnifyingGlass.svg";
import { useState } from "react";

function TotalAlbum() {
  const [flag, setFlag] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <section
      onClick={() => {
        setFlag(!flag);
        setIsClicked(true);
      }}
      className={`${styles.total_album} ${
        isClicked && (flag ? styles.click_total_album : styles.no_click)
      } bg-white dark:bg-dark-block`}
    >
      <div className="flex justify-between w-full p-4">
        <span className="text-xl font-bold">전체 앨범</span>
        <SearchIcon stroke="black" />
      </div>
    </section>
  );
}

export default TotalAlbum;
