import PlusIcon from "@/public/icons/Plus.svg";
import MfriendIcon from "@/public/icons/Mfriend.svg";
import FfriendIcon from "@/public/icons/Ffriend.svg";
import MfriendSelectedIcon from "@/public/icons/MfriendSelected.svg";
import FfriendSelectedIcon from "@/public/icons/FfriendSelected.svg";
import styles from "@/styles/home.module.scss";
import { useRouter } from "next/router";

function TabBar() {
  const router = useRouter();

  return (
    <section
      className={`flex justify-between  w-screen ${styles.tab_bar}`}
      style={{ height: "22.564vw" }}
    >
      {/* 남사친 */}
      <div
        className={`flex flex-col justify-center items-center bg-white dark:bg-dark-block ${styles.tab_bar_block}`}
        style={{ gap: "1.026vw", borderRadius: "4.103vw 4.103vw 0px 0px" }}
      >
        {router.pathname === "/" ? (
          <MfriendSelectedIcon width="8.205vw" height="7.436vw" />
        ) : (
          <MfriendIcon fill="#B1B8C0" />
        )}

        <p style={{ fontSize: "4.103vw" }}>남사친</p>
      </div>

      {/* 플러스 버튼 */}
      <div
        className={`fixed z-50 left-auto right-auto flex justify-center items-center rounded-full ${styles.plus_btn}`}
        style={{ width: "16.41vw", height: "16.41vw" }}
      >
        <PlusIcon />
      </div>

      {/* 가운데 빈 박스 */}
      <div className={`bg-white dark:bg-dark-block ${styles.mid_box}`} />

      {/* 여사친 */}
      <div
        className={`flex flex-col justify-center items-center bg-white dark:bg-dark-block ${styles.tab_bar_block}`}
        style={{ gap: "1.026vw", borderRadius: "4.103vw 4.103vw 0px 0px" }}
      >
        {router.pathname === "/f-friend" ? (
          <FfriendSelectedIcon />
        ) : (
          <FfriendIcon fill="#B1B8C0" />
        )}

        <p style={{ fontSize: "4.103vw" }}>여사친</p>
      </div>
    </section>
  );
}

export default TabBar;
