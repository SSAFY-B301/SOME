import styles from "styles/album.module.scss";
import LeftIcon from "public/icons/CaretLeft.svg";
import { useGetDetail } from "@/pages/api/albumApi";
import Link from "next/link";
import { LoadingTitle } from "@/components/common/Loading";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import { useMemo } from "react";
import { UploadStatus } from "@/components/common/UploadStatus";

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
  const clickSelect = () => {
    setIsSelect(!isSelect);
  };
  const uploadCount = useSelector(
    (state: StateType) => state.photoUpload.uploadCount
  );
  const isUploading = useSelector(
    (state: StateType) => state.photoUpload.isUploading
  );
  const uploadLength = useSelector(
    (state: StateType) => state.photoUpload.uploadLength
  );

  const uploadPer = useMemo(
    () => Math.round((uploadCount / uploadLength) * 100),
    [uploadCount, uploadLength]
  );

  const { getDetail, getDetailIsLoading } = useGetDetail();
  const { theme } = useTheme();
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
          {getDetailIsLoading ? (
            <LoadingTitle />
          ) : getDetail ? (
            <span>{getDetail.album_name}</span>
          ) : (
            <span>데이터 없음</span>
          )}
        </div>
        <div className="relative w-screen h-full flex justify-between items-center p-4">
          {isSelect ? (
            <div className={styles.total_box}>
              <p onClick={() => setIsTotal(!isTotal)}>
                {isTotal ? "선택 해제" : "전체선택"}
              </p>
            </div>
          ) : (
            <Link href={"/boy-home"}>
              <LeftIcon stroke={theme === "dark" ? "white" : "black"} />
            </Link>
          )}
          <div className="flex gap-2">
            <UploadStatus />
            <div
              onClick={clickSelect}
              className={`flex justify-center items-center ${styles.select_box}`}
            >
              {isSelect ? (
                <span className={`${styles.selectBtn}`}>취소</span>
              ) : (
                <span className={`${styles.selectBtn}`}>선택</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
