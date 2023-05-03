import { useRouter } from "next/router";
import styles from "styles/album.module.scss";
import LeftIcon from "public/icons/CaretLeft.svg";
import { useGetDetail } from "@/pages/api/albumApi";

interface NavBarType {
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
  isTotal: boolean;
  setIsTotal: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 *
 * @param isSelect 사진 선택 여부
 * @param setIsSelect 사진 선택 여부 Setter 함수
 * @param isTotal 전체 선택 여부
 * @param setIsTotal 전체 선택 여부 Setter 함수
 * @returns
 */
function NavBar({ isSelect, setIsSelect, isTotal, setIsTotal }: NavBarType) {
  const router = useRouter();
  const clickSelect = () => {
    setIsSelect(!isSelect);
  };
  // TODO : 앨범 ID 넣기
  const albumId: number = 1;
  const { getDetail, getDetailIsLoading } = useGetDetail(albumId);
  return (
    <section className={`${styles.nav_bar}`}>
      <div className={`${styles.nav_bar_items}`}>
        <p
          className={`absolute w-screen h-full flex justify-center items-center ${styles.title}`}
        >
          {getDetailIsLoading
            ? "로딩중"
            : getDetail
            ? getDetail.album_name
            : "데이터 없음"}
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
