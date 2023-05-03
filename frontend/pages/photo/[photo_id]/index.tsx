import React, { useEffect, useMemo, useState } from "react";
import {
  Photo,
  PhotoFeatures,
  Footer,
  DownloadModal,
  DeleteModal,
  VoteModal,
} from "@/components/photo-detail";
import styles from "./photo.module.scss";
import { InfoBar } from "@/components/common/Nav";
import { getPhoto, likePhoto } from "@/pages/api/photoDetailApi";

const PhotoDetail = (): JSX.Element => {
  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);
  const [showConcentrationMode, setConcentrationMode] = useState<boolean>(false);

  /**
   * 사진 상세 정보 접근
   * useQuery
   *  queryKey : photo
   */
  const {resultData: photoDetail} = getPhoto();

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
   * 집중 모드 모달창 생성
   */
  const clickImg = () => {
    showConcentrationMode
      ? setConcentrationMode(false)
      : setConcentrationMode(true);
  };

  /**
   * 공유 요청 알림을 통해서 들어왔을 때 승인 모달 생성 필요
   */

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-white">
      <div className="z-20 flex items-center justify-center w-full h-16 border-b-2">
        <InfoBar title="앨범" />
      </div>
      
      <div className="z-20 flex items-center justify-center w-full h-20">
        <PhotoFeatures />
      </div>
      <Photo
        imgSrc={photoDetail?.s3Url}
        clickImg={clickImg}
        showConcentrationMode={showConcentrationMode}
      />
      <div
        className={`w-full h-24 fixed bottom-0 border-t-2 z-20 rounded-t-2xl flex justify-center items-center ${styles.footer}`}
      >
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
