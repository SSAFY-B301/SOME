import { endPreview, endUpload } from "@/features/photoUploadSlice";
import { StateType } from "@/types/StateType";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/album.module.scss";

export const UploadStatus = () => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadCount === uploadLength) {
      // TODO : 3초 대기
      setTimeout(() => {
        dispatch(endUpload());
        dispatch(endPreview());
      }, 3000);
    }
  }, [uploadCount]);

  return (
    <>
      {isUploading && (
        <div className={`${styles.loading}`}>
          <div className={`${styles.circle}`}>
            <div
              className={`${styles.wave}`}
              style={{
                top: `${32 - (32 / 100) * uploadPer}px`,
                transition: "top 1s",
              }}
            ></div>
          </div>

          <span className={`${styles.loadingText}`}>{`${uploadPer}%`}</span>
        </div>
      )}
    </>
  );
};
