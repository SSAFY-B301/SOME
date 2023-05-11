import React, { ReactEventHandler, useEffect, useMemo, useState } from "react";
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
  VoteCurrentModal,
  ThumbnailModal,
} from "@/components/photo-detail";
import styles from "./photo.module.scss";
import { getPhoto } from "@/pages/api/photoDetailApi";
import { Mutations, useDownload } from "@/pages/api/albumApi";
import { SnsRequestType, ThumbnailBodyType } from "@/types/AlbumTypes";
import { useTheme } from "next-themes";

const PhotoDetail = (): JSX.Element => {
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
  const {
    photoDetail: photoDetail,
    isSnsAgree: isSnsAgree,
    isSnsRequest: isSnsRequest,
  } = getPhoto();

  /**
   * 페이지 이동 슬라이더 구현
   */
  // const onTouchStart = (e: React.TouchEvent) => {
  //   setTouchedX(e.changedTouches[0].pageX);
  //   setTouchedY(e.changedTouches[0].pageY);
  // };

  // const onTouchEnd = (e: React.TouchEvent) => {
  //   const distanceX = touchedX - e.changedTouches[0].pageX;
  //   const distanceY = touchedY - e.changedTouches[0].pageY;

  //   if (distanceX > 30 && isZoom == false) {
  //     console.log("다음 사진!");
  //   } else if (distanceX < -30 && isZoom == false) {
  //     console.log("이전 사진!");
  //   }
  // };

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
    showDeleteModal ? setDeleteModal(false) : setDeleteModal(true);
  };

  /**
   * 공유 요청 모달창 생성
   */
  const clickVote = () => {
    if (isSnsRequest) {
      showVoteCurrentModal
        ? setshowVoteCurrentModal(false)
        : setshowVoteCurrentModal(true);
    } else {
      showVoteModal ? setVoteModal(false) : setVoteModal(true);
    }
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
    const body: ThumbnailBodyType = {
      album_id: photoDetail.albumId,
      new_album_thumbnail_id: photoDetail.photoId,
    };
    mutateThumbnail(body);
  };

  /**
   * 다운로드 API
   */
  const downloadPhoto = () => {
    const url = photoDetail.s3Url;
    useDownload(url);
  };

  /**
   * SNS 공유 요청 API
   */
  const requestSns = () => {
    const body: SnsRequestType = {
      album_id: photoDetail.albumId,
      photo_id: photoDetail.photoId,
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
          setIsZoom(false);
          setRatio(0.7);
          // console.log("줌 아웃");
        } else {
          setIsZoom(true);
          setRatio(3);
          // console.log("줌 인");
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
   * Slider 세팅값
   */
  const sliderSet = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  /**
   * 공유 요청 알림을 통해서 들어왔을 때 승인 모달 생성 필요
   */

  return (
    <div className="w-screen h-screen bg-white dark:bg-dark-bg-home overflow-hidden">
      <div
        className={`z-20 fixed flex items-center justify-center border-b-2 box-border p-4 bg-white dark:bg-dark-block ${styles.info_bar}`}
      >
        <Nav title="앨범" />
      </div>
      <Slider
        className={
          showConcentrationMode
            ? "w-screen h-screen z-30 bg-black"
            : "w-screen h-screen dark:bg-dark-bg-home"
        }
        {...sliderSet}
      >
        <div className="w-screen h-screen">
          <div
            className="absolute w-full h-20 z-20 flex items-center justify-center bg-white dark:bg-dark-block"
            style={{ top: "15.385vw" }}
          >
            <PhotoFeatures />
          </div>
          <Photo
            imgSrc={photoDetail?.s3Url}
            clickImg={clickImg}
            showConcentrationMode={showConcentrationMode}
            isZoom={isZoom}
            ratio={ratio}
            // onTouchEnd={onTouchEnd}
            // onTouchStart={onTouchStart}
          />
        </div>
        {/* <div className="w-screen h-screen">
          <div
            className="absolute w-full h-20 z-20 flex items-center justify-center bg-white"
            style={{ top: "15.385vw" }}
          >
            <PhotoFeatures />
          </div>
          <Photo
            imgSrc={photoDetail?.s3Url}
            clickImg={clickImg}
            showConcentrationMode={showConcentrationMode}
            isZoom={isZoom}
            ratio={ratio}
            // onTouchEnd={onTouchEnd}
            // onTouchStart={onTouchStart}
          />
        </div> */}
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
          clickVote={clickVote}
          clickThumbnail={clickThumbnail}
          theme={theme}
          isSnsAgree={isSnsAgree}
        />
      </div>
      {showDownLoadModal && (
        <DownloadModal
          clickDownload={clickDownload}
          downloadPhoto={downloadPhoto}
        />
      )}
      {showDeleteModal && <DeleteModal clickDelete={clickDelete} />}
      {showVoteModal && (
        <VoteModal clickVote={clickVote} requestSns={requestSns} />
      )}
      {showThumbnailModal && (
        <ThumbnailModal
          clickThumbnail={clickThumbnail}
          putThumbnail={putThumbnail}
        />
      )}
      {showVoteCurrentModal && (
        <VoteCurrentModal clickVote={clickVote} requestSns={requestSns} />
      )}
    </div>
  );
};

export default PhotoDetail;
