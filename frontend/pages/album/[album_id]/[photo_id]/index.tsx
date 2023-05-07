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
  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);
  const [showConcentrationMode, setConcentrationMode] =
    useState<boolean>(false);

  /**
   * 사진 상세 정보 접근
   * useQuery
   *  queryKey : photo
   */
  const { resultData: photoDetail } = getPhoto();

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
   * 이미지를 누른 시점과 그 다음 누른 시점의 딜레이를 체크하고 싶은데 로직을 어떻게 짜야할 지 막막함
   */

  let clickCount = 0;

  const clickImg = () => {
    clickCount += 1;

    setTimeout(() => {
      if (clickCount == 2) {
        clickCount = 0;
        console.log("더블클릭");
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
        className={`z-20 flex items-center justify-center border-b-2 box-border p-4 ${styles.info_bar}`}
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
