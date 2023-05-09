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

// 인터페이스
interface PreviewType {
  photoLength: number;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  inputPhoto: FileList | null;
  uploadCount: number;
  setUploadCount: React.Dispatch<React.SetStateAction<number>>;
  isUploading: MutableRefObject<boolean>;
}
interface previewPhotoType {
  id: number;
  img: string;
}
/**
 * 업로드 사진 미리보기
 * @param photoLength 미리보기 사진 총 개수
 * @param setIsPreview 미리보기 여부
 * @param inputPhoto input 파일들
 * @returns
 */
function Preview({
  photoLength,
  setIsPreview,
  inputPhoto,
  uploadCount,
  setUploadCount,
  isUploading,
}: PreviewType) {
  const range = (size: number, start = 0) => {
    return Array.from({ length: size }, (_, index) => index + start);
  };
  const [previewPhotos, setPreviewPhotos] = useState<previewPhotoType[]>([]);
  // const [uploadCount, setUploadCount] = useState(0);
  // const isUploading = useRef(false);

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
      [...Array(photoLength)].fill(true)
    );

    const countCheck = (isChecks: boolean[]) => {
      return isChecks.filter((isCheck) => isCheck).length;
    };

    const uploadLength = useMemo(() => countCheck(isChecks), [isChecks]);

    const router = useRouter();
    const albumId: number = Number(router.query.album_id);

    const { mutate } = Mutations().usePostPhoto(albumId, setUploadCount);

    /**
     * 미리보기 닫기
     */
    const closePreview = () => {
      setIsPreview(false);
    };

    /**
     * 사진 업로드 유무 변경
     * @param id 사진 id
     */
    const changeCheck = (id: number) => {
      isChecks[id] = !isChecks[id];
      setIsChecks([...isChecks]);
    };

    const uploadPhotos = () => {
      isUploading.current = true;
      // TODO : 사진 업로드 api
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
        setUploadCount(0);
        isUploading.current = false;
        closePreview();
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
            isUploading.current && "hidden"
          } bg-white text-black dark:bg-dark-bg-home dark:text-white`}
        >
          {/* 네브바 */}
          <nav>
            <p onClick={closePreview}>취소</p>
            <p>{`${viewId + 1}/${photoLength}`}</p>
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
        {isUploading.current && false && (
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
