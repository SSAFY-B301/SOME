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
} from "@/components/photo-detail";
import styles from "./photo.module.scss";
import { getPhoto } from "@/pages/api/photoDetailApi";

const PhotoDetail = (): JSX.Element => {
  /**
   * 상호작용 모달 state
   */
  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);

  /**
   * 사진 조작 state
   */
  const [showConcentrationMode, setConcentrationMode] =
    useState<boolean>(false); // 집중 모드
  const [ratio, setRatio] = useState<number>(1);
  const [isZoom, setIsZoom] = useState<boolean>(false); // 줌 상태 판별

  /**
   * 드래그 모션 state
   */
  const [touchedX, setTouchedX] = useState(0);
  const [touchedY, setTouchedY] = useState(0);

  /**
   * 사진 상세 정보 접근
   * useQuery
   *  queryKey : photo
   */
  const { resultData: photoDetail } = getPhoto();

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
    showVoteModal ? setVoteModal(false) : setVoteModal(true);
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
          console.log("줌 아웃");
        } else {
          setIsZoom(true);
          setRatio(3);
          console.log("줌 인");
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
    <div className="w-screen h-screen bg-white overflow-hidden">
      <div
        className={`z-20 fixed flex items-center justify-center border-b-2 box-border p-4 bg-white ${styles.info_bar}`}
      >
        <Nav title="앨범" />
      </div>
      <Slider
        className={
          showConcentrationMode
            ? "w-screen h-screen z-30 bg-black"
            : "w-screen h-screen"
        }
        {...sliderSet}
      >
        <div className="w-screen h-screen">
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
      <div className={`z-20 ${styles.footer}`}>
        <Footer
          clickDownload={clickDownload}
          clickDelete={clickDelete}
          clickVote={clickVote}
        />
      </div>
      {showDownLoadModal && <DownloadModal clickDownload={clickDownload} />}
      {showDeleteModal && <DeleteModal clickDelete={clickDelete} />}
      {showVoteModal && <VoteModal clickVote={clickVote} />}
    </div>
  );
};

export default PhotoDetail;
