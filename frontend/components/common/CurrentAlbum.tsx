import { CurrentAlbumType } from "@/types/AlbumTypes";
import { useRouter } from "next/router";

// CSS
import styles from "styles/home.module.scss";
import ItemBlock from "./ItemBlock";
import { useGetCurrent } from "@/pages/api/currentAlbumApi";
import { useDispatch, useSelector } from "react-redux";
import {
  endCurrentStory,
  setCurrentAlbumId,
  setAlbumIndex,
  startCurrentStory,
  setPosition,
} from "@/features/storySlice";
import { StateType } from "@/types/StateType";
import Story from "./Story";
import { MouseEvent } from "react";

export default function CurrentAlbum() {
  const router = useRouter();

  const { getCurrent } = useGetCurrent();

  const dispatch = useDispatch();

  const isCurrentStory = useSelector(
    (state: StateType) => state.story.isCurrentStory
  );
  const currentAlbumId = useSelector(
    (state: StateType) => state.story.currentAlbumId
  );

  const currentClick = (
    albumId: number,
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    dispatch(setCurrentAlbumId(albumId));
    dispatch(startCurrentStory());
    const index = getCurrent.findIndex((album) => album.album_id === albumId);
    dispatch(setPosition([e.clientY, e.clientX]));
    dispatch(setAlbumIndex(index));
  };

  const currents: React.ReactNode =
    getCurrent && getCurrent.length !== 0 ? (
      getCurrent.map((currentAlbum: CurrentAlbumType) => (
        <div key={currentAlbum.album_id}>
          <div onClick={(e) => currentClick(currentAlbum.album_id, e)}>
            <div
              className="bg-center bg-cover"
              style={{
                width: "12.308vw",
                height: "12.308vw",
                backgroundImage: "url(" + currentAlbum.thumbnail_photo + ")",
                borderRadius: "3.077vw",
              }}
            >
              <div
                className={`rounded-full flex justify-center items-center relative ${styles.count_circle}`}
                style={{
                  width: "5.128vw",
                  height: "5.128vw",
                  top: "-1.282vw",
                  left: "8.974vw",
                }}
              >
                <span className="text-white" style={{ fontSize: "2.564vw" }}>
                  {currentAlbum.photo_list.length <= 10
                    ? currentAlbum.photo_list.length
                    : "10+"}
                </span>
              </div>
            </div>
            <p
              className="overflow-hidden whitespace-nowrap text-ellipsis"
              style={{ fontSize: "3.077vw", width: "13.308vw" }}
            >
              {currentAlbum.album_name}
            </p>
          </div>
          {isCurrentStory && currentAlbumId === currentAlbum.album_id && (
            <Story />
          )}
        </div>
      ))
    ) : (
      <p>아직 추가된 사진이 없어요</p>
    );
  return (
    <section
      className="bg-white dark:bg-dark-block"
      style={{
        padding: "8px 16px",
        width: "92.308vw",
        height: "32.821vw",
        borderRadius: "16px",
      }}
    >
      <div className="flex flex-col justify-around w-full h-full">
        <h1 className="font-bold" style={{ fontSize: "5.128vw" }}>
          최근 업로드
        </h1>
        <div
          className="flex items-center overflow-scroll"
          style={{ gap: "4.103vw", width: "84.102vw", height: "19.487vw" }}
        >
          {currents}
        </div>
      </div>
    </section>
  );
}
