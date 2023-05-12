// 라이브러리
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

// CSS
import styles from "styles/album.module.scss";

// 아이콘
import CheckIcon from "public/icons/Check.svg";
import { Mutations } from "@/pages/api/albumApi";
import { useRouter } from "next/router";
import { requestPartType } from "@/types/AlbumTypes";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { StateType } from "@/types/StateType";

import {
  endPreview,
  endUpload,
  setUploadLength,
  startUpload,
} from "@/features/photoUploadSlice";

// 인터페이스
interface PreviewType {
  inputPhoto: FileList | null;
}
interface previewPhotoType {
  id: number;
  img: string;
}
/**
 * 업로드 사진 미리보기
 * @param inputPhoto input 파일들
 * @returns
 */
function Preview({ inputPhoto }: PreviewType) {
  const range = (size: number, start = 0) => {
    return Array.from({ length: size }, (_, index) => index + start);
  };
  const [previewPhotos, setPreviewPhotos] = useState<previewPhotoType[]>([]);

  let dispatch = useDispatch();
  const uploadLength = useSelector(
    (state: StateType) => state.photoUpload.uploadLength
  );
  const previewLength = useSelector(
    (state: StateType) => state.photoUpload.previewLength
  );

  const isUploading = useSelector(
    (state: StateType) => state.photoUpload.isUploading
  );
  const uploadCount = useSelector(
    (state: StateType) => state.photoUpload.uploadCount
  );
  const albumId = useSelector((state: StateType) => state.albumStatus.albumId);
  // 사진 미리보기
  useEffect(() => {
    if (previewPhotos.length === 0 && inputPhoto) {
      range(inputPhoto.length).forEach((idx) => {
        previewPhotos.push({
          id: idx,
          img: URL.createObjectURL(inputPhoto.item(idx)!),
        });
      });
    }
    setPreviewPhotos([...previewPhotos]);
  }, [inputPhoto]);

  if (inputPhoto) {
    // 현재 이미지 id
    const [viewId, setViewId] = useState<number>(0);

    // 업로드 유무
    const [isChecks, setIsChecks] = useState<boolean[]>(
      [...Array(previewLength)].fill(true)
    );

    const countCheck = (isChecks: boolean[]) => {
      return isChecks.filter((isCheck) => isCheck).length;
    };

    // const uploadLength = useMemo(() => countCheck(isChecks), [isChecks]);

    useEffect(() => {
      const uploadLength = isChecks.filter((isCheck) => isCheck).length;
      dispatch(setUploadLength({ uploadLength: uploadLength }));
    }, [isChecks]);

    const { mutate } = Mutations().usePostPhoto();

    /**
     * 사진 업로드 유무 변경
     * @param id 사진 id
     */
    const changeCheck = (id: number) => {
      isChecks[id] = !isChecks[id];
      setIsChecks([...isChecks]);
    };

    /**
     * * 사진 업로드
     */
    const uploadPhotos = () => {
      dispatch(startUpload());

      Array.from(inputPhoto).forEach((file, index) => {
        if (isChecks[index]) {
          let formData = new FormData();
          formData.append("multipartFile", file);
          const requestData: requestPartType = {
            formData: formData,
            albumId: albumId,
          };
          mutate(requestData);
        }
      });
    };

    useEffect(() => {
      if (uploadCount === uploadLength) {
        // TODO : 3초 대기
        setTimeout(() => {
          dispatch(endUpload());
          dispatch(endPreview());
        }, 3000);
      }
    }, [uploadCount]);

    // react-slick 설정
    const settings: Settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      lazyLoad: "anticipated",
      customPaging: function (i: number) {
        return (
          <a>
            <div
              className={`bg-contain bg-center bg-no-repeat ${
                styles.paging_photo
              } ${viewId !== i && styles.no_active}`}
              style={{ backgroundImage: `url(${previewPhotos[i].img})` }}
            />
          </a>
        );
      },
      afterChange: function (current: number) {
        setViewId(current);
      },
    };

    return (
      <>
        <section
          className={`${styles.preview} ${
            isUploading && "hidden"
          } bg-white text-black dark:bg-dark-bg-home dark:text-white`}
        >
          {/* 네브바 */}
          <nav>
            <p onClick={() => dispatch(endPreview())}>취소</p>
            <p>{`${viewId + 1}/${previewLength}`}</p>
            <p onClick={uploadPhotos}>확인</p>
          </nav>

          <div style={{ maxWidth: "100vw", width: "100vw" }}>
            {/* // TODO : 에러 해결 */}
            <Slider {...settings}>
              {previewPhotos.map((photo) => (
                <div key={photo.id}>
                  <div
                    key={photo.id}
                    className={`bg-contain bg-center bg-no-repeat justify-end ${styles.view_photo}`}
                    style={{ backgroundImage: `url(${photo.img})` }}
                  >
                    <div
                      onClick={() => {
                        changeCheck(photo.id);
                      }}
                      className={`${styles.check_box} ${
                        isChecks[photo.id] ? styles.is_check : styles.no_check
                      }`}
                    >
                      {isChecks[photo.id] && (
                        <CheckIcon
                          width={"24px"}
                          height={"24px"}
                          fill={"white"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        {isUploading && false && (
          <>
            <div
              className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40 z-20 text-white text-xl"
              style={{ width: "100vw", height: "100vh" }}
            >
              {/* // TODO : 나중에 조금더 발전시키기*/}
              {`${uploadCount} / ${uploadLength}`}
            </div>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export default Preview;
