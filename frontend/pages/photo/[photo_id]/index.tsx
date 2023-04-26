import React, { useState } from "react";
import { useRouter } from "next/router";
import CaretLeft from "@/public/icons/CaretLeft.svg";
import styles from "./photo.module.scss";
import PhotoFeatures from "@/components/photo-detail/PhotoFeatures";
import Footer from "@/components/photo-detail/Footer";
import DownloadModal from "@/components/photo-detail/DownloadModal";
import DeleteModal from "@/components/photo-detail/DeleteModal";
import VoteModal from "@/components/photo-detail/VoteModal";

const PHOTO = {
  img: "https://images.unsplash.com/photo-1619964550581-a344c6f0c1a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  date: "2023년 04월 26일",
};

const USER = {
  profileImg:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  name: "남사친",
};

const PhotoDetail = (): JSX.Element => {
  const router = useRouter();

  const [showDownLoadModal, setDownLoadShowModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [showVoteModal, setVoteModal] = useState<boolean>(false);

  const clickDownload = () => {
    showDownLoadModal
      ? setDownLoadShowModal(false)
      : setDownLoadShowModal(true);
  };

  const clickDelete = () => {
    showDeleteModal ? setDeleteModal(false) : setDeleteModal(true);
  };

  const clickVote = () => {
    showVoteModal ? setVoteModal(false) : setVoteModal(true);
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <div className="w-full h-16 flex justify-center items-center border-b-2">
        <div className="w-11/12 h-full relative">
          <div onClick={() => router.back()}>
            <CaretLeft className="absolute top-1/2 -translate-y-1/2 left-0 text-black text-lg" />
          </div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-2xl">
            앨범
          </span>
        </div>
      </div>
      <div className="w-full h-20 flex justify-center items-center">
        <PhotoFeatures user={USER} photo={PHOTO} />
      </div>
      <div
        className="w-screen bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(" +
            "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fCVFQyU4MiVBQyVFQiU5RSU4Q3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" +
            ")",
          height: "600px",
        }}
      ></div>
      <div
        className={`w-full h-24 fixed bottom-0 border-t-2 rounded-t-2xl flex justify-center items-center ${styles.footer}`}
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
