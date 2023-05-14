import { endCurrentStory } from "@/features/storySlice";
import { useMutationNoti } from "@/pages/api/notiApi";
import { StateType } from "@/types/StateType";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/story.module.scss";
import AlarmTime from "../pages/notification/AlarmTime";
import ExitIcon from "public/icons/X.svg";
import FavIcon from "public/icons/Heart.svg";
import { useGetCurrent } from "@/pages/api/currentAlbumApi";
import { storyApiDataType } from "@/types/ApiTypes";

function Story() {
  const dispatch = useDispatch();
  const { statusMutation } = useMutationNoti();
  const { getCurrent: getStoryData, getCurrentIsLoading: getStoryIsLoading } =
    useGetCurrent();

  const nowIndex = useSelector((state: StateType) => state.story.albumIndex);
  const [albumIndex, setAlbumIndex] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [albums, setAlbums] = useState<storyApiDataType[]>(
    getStoryData.slice(nowIndex).concat(getStoryData.slice(0, nowIndex))
  );

  const albumLength = useMemo(() => albums?.length, [albums]);
  const photos = useMemo(
    () => albums && albums[albumIndex].photo_list,
    [albumIndex]
  );
  const photosLength = useMemo(() => (photos ? photos?.length : 0), [photos]);

  const endCurrent = () => {
    dispatch(endCurrentStory());
  };

  useEffect(() => {
    setTimeout(() => {
      const notiId: number = albums[albumIndex].photo_list[photoIndex].noti_id;
      statusMutation({ noti_id: notiId, noti_status: "DONE" });
      if (photoIndex < photosLength - 1) {
        setPhotoIndex(photoIndex + 1);
      } else {
        if (albumIndex + 1 == albumLength) {
          dispatch(endCurrentStory());
        }
        setPhotoIndex(0);
        setAlbumIndex(albumIndex + 1);
      }
    }, 4000);
  }, [albumIndex, photoIndex]);

  return (
    <>
      {getStoryIsLoading ? (
        <></>
      ) : albums ? (
        <section
          className={`${styles.story} ${styles.now_album}`}
          onClick={endCurrent}
        >
          <div
            className={`${styles.image}`}
            style={{
              backgroundImage: `url(${albums[albumIndex].photo_list[photoIndex].photo_url})`,
            }}
          >
            <div className={`${styles.info_container}`}>
              <nav>
                <div
                  className={`${styles.status_bar} grid`}
                  style={{
                    gridTemplateColumns: `repeat(${photosLength}, 1fr)`,
                  }}
                >
                  {[...Array(photosLength)].map((_, index) => (
                    <div
                      key={index}
                      className={`${styles.each_bar} ${
                        index === photoIndex
                          ? styles.now
                          : index < photoIndex
                          ? styles.before
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <div className={`${styles.info}`}>
                  <div className={styles.info_item}>
                    <div
                      className={styles.profile}
                      style={{
                        backgroundImage: `url(${albums[albumIndex].photo_list[photoIndex].user_image})`,
                      }}
                    ></div>
                    <div className={styles.name}>
                      <span>
                        {albums[albumIndex].photo_list[photoIndex].user_name}
                      </span>
                    </div>
                    <div className={styles.time}>
                      <AlarmTime
                        time={
                          albums[albumIndex].photo_list[photoIndex].upload_date
                        }
                      ></AlarmTime>
                    </div>
                  </div>
                  <div className={styles.exit}>
                    <ExitIcon width={"24px"} height={"24px"} stroke={"white"} />
                  </div>
                </div>
              </nav>
              {/* <footer>
                <div className={styles.go_to_album}></div>
                <div className={styles.fav}>
                  {
                  <FavIcon width={"24px"} height={"24px"} fill={"non"} />
                  <FavIcon width={"24px"} height={"24px"} fill={"non"} />
                }
                </div>
              </footer> */}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default Story;
