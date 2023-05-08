import React, { ReactEventHandler, useEffect, useMemo, useState } from "react";
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
  const [isZoom, setIsZoom] = useState<boolean>(false); // 줌 상태 판별

  /**
   * 드래그 모션 state
   */
  const [tochedX, setTochedX] = useState(0);
  const [tochedY, setTochedY] = useState(0);

  /**
   * 사진 상세 정보 접근
   * useQuery
   *  queryKey : photo
   */
  const { resultData: photoDetail } = getPhoto();

  /**
   * 페이지 이동 슬라이더 구현
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTochedX(e.changedTouches[0].pageX);
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceX = tochedX - e.changedTouches[0].pageX;
    const distanceY = tochedY - e.changedTouches[0].pageY;

    if (distanceX > 30 && isZoom == false) {
      console.log("다음 사진!");
    } else if (distanceX < -30 && isZoom == false) {
      console.log("이전 사진!");
    }
  };

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
          console.log("줌 아웃");
        } else {
          setIsZoom(true);
          console.log("줌 인");
        }
      } else if (clickCount == 1) {
        clickCount = 0;
        showConcentrationMode
          ? setConcentrationMode(false)
          : setConcentrationMode(true);
      }
    }, 250);
  };

  /**
   * 공유 요청 알림을 통해서 들어왔을 때 승인 모달 생성 필요
   */

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-white">
      <div
        className={`z-20 flex items-center justify-center border-b-2 box-border p-4 bg-white ${styles.info_bar}`}
      >
        <Nav title="앨범" />
      </div>

      <div className="z-20 flex items-center justify-center w-full h-20 bg-white">
        <PhotoFeatures />
      </div>
      <Photo
        imgSrc={photoDetail?.s3Url}
        clickImg={clickImg}
        showConcentrationMode={showConcentrationMode}
        isZoom={isZoom}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      />
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
