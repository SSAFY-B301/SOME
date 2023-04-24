import PlusIcon from "@/public/icon/Plus.svg";
import MfriendIcon from "@/public/icon/Mfriend.svg";
import FfriendIcon from "@/public/icon/Ffriend.svg";
import MfriendSelectedIcon from "@/public/icon/MfriendSelected.svg";
import FfriendSelectedIcon from "@/public/icon/FfriendSelected.svg";
import styles from "@/styles/style.module.scss";
import { useRouter } from "next/router";

function TabBar() {
  const router = useRouter();

  return (
    <section
      className="flex justify-between fixed bottom-0 w-screen"
      style={{ height: "88px" }}
    >
      <div
        className={`flex flex-col justify-center items-center gap-1 bg-white dark:bg-dark-block rounded-t-2xl ${styles.tab_bar}`}
        style={{ width: "170px", height: "88px" }}
      >
        {router.pathname === "/" ? (
          <MfriendSelectedIcon />
        ) : (
          <MfriendIcon fill="#B1B8C0" />
        )}

        <p className=" text-xs">남사친</p>
      </div>
      <div
        className={`fixed z-50 left-auto right-auto flex justify-center items-center rounded-full w-16 h-16 ${styles.plus_btn}`}
      >
        <PlusIcon />
      </div>
      <div
        className={`fixed bg-white dark:bg-dark-block bottom-0 ${styles.mid_box}`}
      />
      <div
        className={`flex flex-col justify-center items-center  gap-1 bg-white dark:bg-dark-block rounded-t-2xl ${styles.tab_bar}`}
        style={{ width: "170px", height: "88px" }}
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
