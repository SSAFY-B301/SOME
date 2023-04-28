// 라이브러리
import { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";

// CSS
import styles from "styles/album.module.scss";

// 아이콘
import CheckIcon from "public/icons/Check.svg";

// 인터페이스
interface PreviewType {
  previewPhotos: previewPhotoType[];
  photoLength: number;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}
interface previewPhotoType {
  id: number;
  img: string;
}
/**
 * 업로드 사진 미리보기
 * @param previewPhotos 미리보기 사진 목록
 * @param photoLength 미리보기 사진 총 개수
 * @param setIsPreview 미리보기 여부
 * @returns
 */
function Preview({ previewPhotos, photoLength, setIsPreview }: PreviewType) {
  // 현재 이미지 id
  const [viewId, setViewId] = useState<number>(0);

  // 업로드 유무
  const [isChecks, setIsChecks] = useState<boolean[]>(
    [...Array(photoLength)].fill(true)
  );

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

  /**
   * 사진 업로드
   */
  const uploadPhotos = () => {
    const uploadPhotos = previewPhotos.filter((photo) => isChecks[photo.id]);

    // TODO : 사진 업로드 api
    closePreview;
  };

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
    <section
      className={`${styles.preview} bg-white text-black dark:bg-dark-bg-home dark:text-white`}
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
            <div>
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
                    <CheckIcon width={"24px"} height={"24px"} fill={"white"} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Preview;
