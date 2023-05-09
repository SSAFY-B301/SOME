import { useRouter } from "next/router";
import styles from "styles/album.module.scss";
import LeftIcon from "public/icons/CaretLeft.svg";
import { useGetDetail } from "@/pages/api/albumApi";
import Link from "next/link";
import { LoadingTitle } from "@/components/common/Loading";
import { useTheme } from "next-themes";

interface NavBarType {
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
  isTotal: boolean;
  setIsTotal: React.Dispatch<React.SetStateAction<boolean>>;
  isAlbumLoading: () => boolean;
}

/**
 *
 * @param isSelect 사진 선택 여부
 * @param setIsSelect 사진 선택 여부 Setter 함수
 * @param isTotal 전체 선택 여부
 * @param setIsTotal 전체 선택 여부 Setter 함수
 * @returns
 */
function NavBar({
  isSelect,
  setIsSelect,
  isTotal,
  setIsTotal,
  isAlbumLoading,
}: NavBarType) {
  const router = useRouter();
  const clickSelect = () => {
    setIsSelect(!isSelect);
  };

  const albumId: number = Number(router.query.album_id);
  const { getDetail } = useGetDetail(albumId);
  const { theme, setTheme } = useTheme();
  return (
    <section className={`${styles.nav_bar}`}>
      <div
        className={`${styles.nav_bar_items} ${
          theme === "dark" ? styles.dark : styles.light
        }`}
      >
        <div
          className={`absolute w-screen h-full flex justify-center items-center ${styles.title}`}
        >
          {isAlbumLoading() ? (
            <LoadingTitle />
          ) : getDetail ? (
            <span>{getDetail.album_name}</span>
          ) : (
            <span>데이터 없음</span>
          )}
        </div>
        <div className="relative w-screen h-full flex justify-between items-center p-4">
          {isSelect ? (
            <p onClick={() => setIsTotal(!isTotal)}>
              {isTotal ? "선택 해제" : "전체선택"}
            </p>
          ) : (
            <Link href={"/boy-home"}>
              <LeftIcon stroke={theme === "dark" ? "white" : "black"} />
            </Link>
          )}
          <div onClick={clickSelect}>
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
