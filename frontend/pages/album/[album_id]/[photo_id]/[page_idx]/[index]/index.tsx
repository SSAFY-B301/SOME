import React, {
  ReactEventHandler,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Photo,
  PhotoFeatures,
  Footer,
  DownloadModal,
  DeleteModal,
  VoteModal,
  Nav,
  ThumbnailModal,
} from "@/components/photo-detail";
import styles from "./photo.module.scss";
import { getPhoto } from "@/pages/api/photoDetailApi";
import {
  Mutations,
  useDownload,
  useInfinitePhotos,
} from "@/pages/api/albumApi";
import { SnsRequestType, ThumbnailBodyType } from "@/types/AlbumTypes";
import { useTheme } from "next-themes";

const PhotoDetail = (): JSX.Element => {
  /**
   * 쿼리의 album_id, photo_id, page_num, page_idx 사용하기 위해 router 사용
   */
  const router = useRouter();
  const album_id: number = Number(router.query.album_id);
  const photo_id: number = Number(router.query.photo_id);
  const page_num: number = Number(router.query.page_idx);
  const page_idx: number = Number(router.query.index);

  /**
   * 캐러셀 인덱스 state
   */
  const [page, setPage] = useState<number>(page_num);
  const [carouselIdx, setCarouselIdx] = useState<number>(page_idx);

  /**
   * 현재 사진 Id state
   */
  const [currentPhotoId, setPhotoId] = useState<number>(photo_id);

  /**
   * 상호작용 모달 state
   */
  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);
  const [showThumbnailModal, setThumbnailModal] = useState<boolean>(false);
  const [showVoteCurrentModal, setshowVoteCurrentModal] =
    useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  /**
   * 사진 조작 state
   */
  const [showConcentrationMode, setConcentrationMode] =
    useState<boolean>(false); // 집중 모드
  const [ratio, setRatio] = useState<number>(1);
  const [isZoom, setIsZoom] = useState<boolean>(false); // 줌 상태 판별

  /**
   * 사진 상세 정보 접근
   * useQuery
   *  queryKey : photo
   * photoDetail: 사진 상세 정보
   * noReplyFriends: 공유 투표 미응답자
   * declineFriends: 공유 투표 거절자
   * acceptFriends: 공유 투표 수락자
   * isSnsAgree: 투표 결과 여부
   * isSnsRequest: 투표 진행 중 여부
   */
  const { photoDetail: photoDetail, isSnsRequest: isSnsRequest } =
    getPhoto(photo_id);

  /**
   * 캐러셀 구성할 사진 리스트
   */
  const { data: albumData } = useInfinitePhotos();

  /**
   * 다운로드 모달창 생성
   */
  const clickDownload = () => {
    showDownLoadModal
      ? setDownLoadShowModal(false)
      : setDownLoadShowModal(true);
  };

  /**
   * 삭제 모달창 생성
   */
  const clickDelete = () => {
    if (albumData) {
      setPhotoId(albumData.pages[page].albumPhotoList[carouselIdx].photoId);
    }
    showDeleteModal ? setDeleteModal(false) : setDeleteModal(true);
  };

  /**
   * 공유 요청 모달창 생성
   */
  const clickVote = (photoId: number | undefined) => {
    if (photoId) {
      setPhotoId(photoId);
    }
    showVoteModal ? setVoteModal(false) : setVoteModal(true);
  };

  /**
   * 썸네일 수정 모달창 생성
   */
  const clickThumbnail = () => {
    console.log(showThumbnailModal);

    showThumbnailModal ? setThumbnailModal(false) : setThumbnailModal(true);
  };

  const { usePutThumbnail, usePostSns, useDeletePhotos } = Mutations();
  const { mutate: mutateThumbnail } = usePutThumbnail();
  const { mutate: mutateSns } = usePostSns();
  const { mutate: mutateDeletePhoto } = useDeletePhotos();

  /**
   * 썸네일 수정 API
   */
  const putThumbnail = () => {
    if (albumData) {
      const body: ThumbnailBodyType = {
        album_id: album_id,
        new_album_thumbnail_id:
          albumData.pages[page].albumPhotoList[carouselIdx].photoId,
      };
      mutateThumbnail(body);
    }
  };

  /**
   * 다운로드 API
   */
  const downloadPhoto = () => {
    if (albumData) {
      const url = albumData.pages[page].albumPhotoList[carouselIdx].originUrl;
      useDownload(url);
    }
  };

  /**
   * SNS 공유 요청 API
   */
  const requestSns = () => {
    const body: SnsRequestType = {
      album_id: String(album_id),
      photo_id: String(currentPhotoId),
    };
    mutateSns(body);
  };

  /**
   * 클릭 이벤트 분기 로직
   */

  let clickCount = 0;

  const clickImg = () => {
    clickCount += 1;

    setTimeout(() => {
      if (clickCount == 2) {
        clickCount = 0;
        if (isZoom) {
          // console.log("doubleclick")
        }
      } else if (clickCount == 1) {
        clickCount = 0;
        showConcentrationMode
          ? setConcentrationMode(false)
          : setConcentrationMode(true);
      }
    }, 300);
  };

  /**
   * page 이동 처리
   */
  const setNextPage = (direction: string) => {
    if (albumData) {
      if (direction == "left" && !albumData.pages[page].is_last) {
        setTimeout(() => {
          setCarouselIdx(0);
          setTimeout(() => {
            setPage(page + 1);
          }, 500);
        }, 500);
      } else if (direction == "right" && !albumData.pages[page].is_first) {
        setTimeout(() => {
          setCarouselIdx(26);
          setTimeout(() => {
            setPage(page - 1);
          }, 500);
        }, 300);
      }
    }
  };

  /**
   * Slider 세팅값
   */
  const sliderSet = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: carouselIdx,
    beforeChange: (current: number, next: number) => setCarouselIdx(next),
    onEdge: (direction: string) => setNextPage(direction),
  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-dark-bg-home overflow-hidden">
      <div
        className={`z-20 fixed flex items-center justify-center box-border p-4 bg-white dark:bg-dark-block ${styles.info_bar}`}
      >
        <Nav title="앨범" />
      </div>
      <Slider
        ref={(slider) => {
          slider && slider.slickGoTo(carouselIdx);
        }}
        className={
          showConcentrationMode
            ? "w-screen h-screen z-30 bg-black"
            : "w-screen h-screen dark:bg-dark-bg-home"
        }
        {...sliderSet}
      >
        {albumData &&
          albumData.pages[page].albumPhotoList.map(
            (photo): JSX.Element => (
              <div className="relative w-screen h-screen">
                <div
                  className="absolute w-full h-20 z-20 flex items-center justify-center bg-white dark:bg-dark-block"
                  style={{ top: "15.385vw" }}
                >
                  <PhotoFeatures
                    photoId={photo.photoId}
                    clickVote={clickVote}
                    isSnsRequest={isSnsRequest}
                  />
                </div>
                <Photo
                  imgSrc={photo.originUrl}
                  clickImg={clickImg}
                  showConcentrationMode={showConcentrationMode}
                />
              </div>
            )
          )}
      </Slider>
      <div
        className={
          theme == "light"
            ? `z-20 ${styles.footer}`
            : `z-20 ${styles.footer_dark}`
        }
      >
        <Footer
          clickDownload={clickDownload}
          clickDelete={clickDelete}
          clickThumbnail={clickThumbnail}
          theme={theme}
        />
      </div>
      {showDownLoadModal && (
        <DownloadModal
          clickDownload={clickDownload}
          downloadPhoto={downloadPhoto}
        />
      )}
      {showDeleteModal && (
        <DeleteModal clickDelete={clickDelete} photoId={currentPhotoId} />
      )}
      {showVoteModal && (
        <VoteModal
          clickVote={clickVote}
          requestSns={requestSns}
          photoId={currentPhotoId}
        />
      )}
      {showThumbnailModal && (
        <ThumbnailModal
          clickThumbnail={clickThumbnail}
          putThumbnail={putThumbnail}
        />
      )}
    </div>
  );
};

export default PhotoDetail;
