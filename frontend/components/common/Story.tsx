import { clearNotiIds, endCurrentStory } from "@/features/storySlice";
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
import { addNotiIds } from "@/features/storySlice";
import Image from "next/image";

function Story() {
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const [timeoutIds, setTimeoutIds] = useState<ReturnType<typeof setTimeout>[]>(
    []
  );
  const dispatch = useDispatch();
  const { statusMutation } = useMutationNoti();
  const { getCurrent: getStoryData, getCurrentIsLoading: getStoryIsLoading } =
    useGetCurrent();
  const notiIds = useSelector((state: StateType) => state.story.notiIds);
  const position = useSelector((state: StateType) => state.story.position);

  const nowIndex = useSelector((state: StateType) => state.story.albumIndex);
  const [albumIndex, setAlbumIndex] = useState<number>(0);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [albums, setAlbums] = useState<storyApiDataType[]>(
    getStoryData.slice(nowIndex).concat(getStoryData.slice(0, nowIndex))
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startTouchPosition, setStartTouchPosition] = useState<number[]>([
    0, 0,
  ]);
  const [endTouchPosition, setEndTouchPosition] = useState<number[]>([0, 0]);
  const [moveTouchPosition, setMoveTouchPosition] = useState<number[]>([0, 0]);
  const [isPrev, setIsPrev] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const albumLength = useMemo(() => albums?.length, [albums]);
  const photos = useMemo(
    () => albums && albums[albumIndex].photo_list,
    [albumIndex]
  );
  const photosLength = useMemo(() => (photos ? photos?.length : 0), [photos]);
  const screenWidth = useMemo(() => window.screen.availWidth, []);
  const endCurrent = () => {
    setIsDown(true);
    // notiDone();
    setTimeout(() => {
      dispatch(endCurrentStory());
    }, 1000);
  };

  const endOpen = () => {
    setIsOpen(true);
  };

  const startTouch = (x: number, y: number) => {
    setStartTouchPosition([x, y]);
    if (x < screenWidth / 3) {
      setIsPrev(true);
      setIsNext(false);
    } else {
      setIsPrev(false);
      setIsNext(true);
    }
  };

  const endTouch = (x: number, y: number) => {
    const diffPositionX = startTouchPosition[0] - x;
    const diffPositionY = startTouchPosition[1] - y;
    setEndTouchPosition([x, y]);
    console.log("end", timeoutId);

    const temp = timeoutIds.slice(0, -1);
    temp.forEach((id) => clearTimeout(id));
    setTimeoutIds(timeoutIds.slice(-1));

    // clearTimeout(timeoutId);
    if (screenWidth - 54 > x || y > 54) {
      if (diffPositionY < -50) {
        console.log(diffPositionY);
        endCurrent();
      } else if (-5 < diffPositionX && diffPositionX < 5) {
        // 제자리 터치
        if (isPrev) {
          // 이전 사진으로 이동
          if (photoIndex - 1 >= 0) {
            setPhotoIndex(photoIndex - 1);
          } else {
            if (albumIndex - 1 >= 0) {
              setPhotoIndex(0);
              setAlbumIndex(albumIndex - 1);
            } else {
              endCurrent();
            }
          }
        } else if (isNext) {
          // 다음 사진으로 이동
          if (photoIndex + 1 < photosLength) {
            setPhotoIndex(photoIndex + 1);
          } else {
            if (albumIndex + 1 < albumLength) {
              setPhotoIndex(0);
              setAlbumIndex(albumIndex + 1);
            } else {
              endCurrent();
            }
          }
        }
      } else if (diffPositionX > 0) {
        // 다음 앨범으로 이동
        if (albumIndex + 1 < albumLength) {
          setPhotoIndex(0);
          setAlbumIndex(albumIndex + 1);
        } else {
          endCurrent();
        }
      } else {
        // 이전 앨범으로 이동
        if (albumIndex - 1 >= 0) {
          setPhotoIndex(0);
          setAlbumIndex(albumIndex - 1);
        } else {
          endCurrent();
        }
      }
    }

    setIsPrev(false);
    setIsNext(false);
    setIsMove(false);
  };

  const moveTouch = (x: number, y: number) => {
    setIsMove(true);
    setMoveTouchPosition([x, y]);
  };

  // const notiDone = () => {
  //   const temp: Set<number> = new Set(notiIds);
  //   temp.forEach((id) => {
  //     statusMutation({ noti_id: id, noti_status: "DONE" });
  //   });
  //   dispatch(clearNotiIds());
  // };

  useEffect(() => {
    const notiId: number = albums[albumIndex].photo_list[photoIndex].noti_id;
    // dispatch(addNotiIds(notiId));
    statusMutation({ noti_id: notiId, noti_status: "DONE" });
    const id = setTimeout(() => {
      if (photoIndex < photosLength - 1) {
        setPhotoIndex(photoIndex + 1);
      } else {
        if (albumIndex + 1 == albumLength) {
          setIsOpen(false);
          endCurrent();
        } else {
          setPhotoIndex(0);
          setAlbumIndex(albumIndex + 1);
        }
      }
    }, 4000);
    // console.log("id", id);

    setTimeoutId(id);
    setTimeoutIds((prev) => [...prev, id]);
  }, [albumIndex, photoIndex]);

  // useEffect(() => {
  //   console.log("timeoutIds", timeoutIds);
  // }, [timeoutIds]);

  return (
    <>
      {getStoryIsLoading ? (
        <></>
      ) : albums ? (
        <>
          <section
            className={`${styles.story} ${isPrev ? styles.prev : ""} ${
              isDown ? styles.down : ""
            }`}
            onAnimationEnd={endOpen}
            onTouchStart={(e) =>
              startTouch(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
            }
            onTouchEnd={(e) =>
              endTouch(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
            }
            onTouchMove={(e) =>
              moveTouch(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
            }
            style={{ top: `${position[0]}px`, left: `${position[1]}px` }}
          >
            {isOpen && (
              <main
                className={styles.main}
                style={
                  isMove
                    ? { top: moveTouchPosition[1] - startTouchPosition[1] }
                    : { top: "0px" }
                }
              >
                <div
                  className={`${styles.image}`}
                  // style={{
                  //   backgroundImage: `url(${albums[albumIndex].photo_list[photoIndex].photo_url})`,
                  // }}
                >
                  <Image
                    src={albums[albumIndex].photo_list[photoIndex].photo_url}
                    alt="story"
                    style={{ objectFit: "contain" }}
                    fill
                  />
                </div>
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
                            {
                              albums[albumIndex].photo_list[photoIndex]
                                .user_name
                            }
                          </span>
                        </div>
                        <div className={styles.time}>
                          <AlarmTime
                            time={
                              albums[albumIndex].photo_list[photoIndex]
                                .upload_date
                            }
                          ></AlarmTime>
                        </div>
                      </div>
                      <div className={styles.exit} onClick={endCurrent}>
                        <ExitIcon
                          width={"24px"}
                          height={"24px"}
                          stroke={"white"}
                        />
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
              </main>
            )}
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Story;
