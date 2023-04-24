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
      className="flex justify-between fixed bottom-0 w-screen"
      style={{ height: "10.427vh" }}
    >
      {/* 남사친 */}
      <div
        className={`flex flex-col justify-center items-center gap-1 bg-white dark:bg-dark-block rounded-t-2xl ${styles.tab_bar}`}
      >
        {router.pathname === "/" ? (
          <MfriendSelectedIcon />
        ) : (
          <MfriendIcon fill="#B1B8C0" />
        )}

        <p className=" text-xs">남사친</p>
      </div>

      {/* 플러스 버튼 */}
      <div
        className={`fixed z-50 left-auto right-auto flex justify-center items-center rounded-full w-16 h-16 ${styles.plus_btn}`}
      >
        <PlusIcon />
      </div>

      {/* 가운데 빈 박스 */}
      <div
        className={`fixed bg-white dark:bg-dark-block bottom-0 ${styles.mid_box}`}
      />

      {/* 여사친 */}
      <div
        className={`flex flex-col justify-center items-center  gap-1 bg-white dark:bg-dark-block rounded-t-2xl ${styles.tab_bar}`}
      >
        {router.pathname === "/f-friend" ? (
          <FfriendSelectedIcon />
        ) : (
          <FfriendIcon fill="#B1B8C0" />
        )}

        <p className=" text-xs">여사친</p>
      </div>
    </section>
  );
}

export default TabBar;
