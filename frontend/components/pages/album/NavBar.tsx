import { useRouter } from "next/router";
import styles from "@/styles/album.module.scss";
import LeftIcon from "@/public/icons/CaretLeft.svg";

interface NavBarType {
  title: string;
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
  isTotal: boolean;
  setIsTotal: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({
  title,
  isSelect,
  setIsSelect,
  isTotal,
  setIsTotal,
}: NavBarType) {
  const router = useRouter();
  const clickSelect = () => {
    setIsSelect(!isSelect);
  };
  return (
    <section className={`${styles.nav_bar}`}>
      <div className={`${styles.nav_bar_items}`}>
        <p
          className={`absolute w-screen h-full flex justify-center items-center ${styles.title}`}
        >
          {title}
        </p>
        <div className="relative w-screen h-full flex justify-between items-center p-4">
          {isSelect ? (
            <p onClick={() => setIsTotal(!isTotal)}>
              {isTotal ? "선택 해제" : "전체선택"}
            </p>
          ) : (
            <LeftIcon onClick={() => router.back()} stroke="black" />
          )}

          <div onClick={clickSelect}>
            // TODO : 토탈 state 해제하기
            {isSelect ? (
              <span className={`${styles.selectBtn}`}>취소</span>
            ) : (
              <span className={`${styles.selectBtn}`}>사진 선택</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
