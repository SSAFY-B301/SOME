// 컴포넌트
import Photos from "components/pages/album/Photos";
import Categories from "components/pages/album/Categories";
import Members from "components/pages/album/Members";
import NavBar from "components/pages/album/NavBar";
import TabBar from "components/pages/album/TabBar";
import Alert from "components/pages/album/Alert";
import EditAlbumName from "components/pages/album/EditAlbumName";
import { LoadingCount } from "components/common/Loading";
import Preview from "components/pages/album/Preview";

// 라이브러리
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// API
import { Mutations, useGetDetail, useInfinitePhotos } from "pages/api/albumApi";

// CSS
import styles from "styles/album.module.scss";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/types/StateType";
import {
  addUserIdState,
  setALbumIdState,
  setInit,
} from "@/features/albumStatusSlice";

// 아이콘
import UpIcon from "public/icons/CaretUp.svg";

function AlbumDetail() {
  const router = useRouter();
  const albumId = useSelector((state: StateType) => state.albumStatus.albumId);
  const categoryId = useSelector(
    (state: StateType) => state.albumStatus.categoryId
  );
  const userId = useSelector((state: StateType) => state.albumStatus.userId);

  const isPreview = useSelector(
    (state: StateType) => state.photoUpload.isPreview
  );

  const [membersId, setMembersId] = useState<string[]>([]);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInit());
    dispatch(setALbumIdState({ albumId: Number(router.query.album_id) }));
  }, [router.query.album_id]);

  const { getDetail, getDetailIsLoading } = useGetDetail();

  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [isTotal, setIsTotal] = useState<boolean>(false);

  const [inputPhoto, setInputPhoto] = useState<FileList | null>(null);

  const [isAlerts, setIsAlerts] = useState<boolean[]>(
    [...Array(4)].fill(false)
  );

  const {
    data: getPhotosPages,
    getTotal,
    getTotalId,
    isLoading: getPhotosIsLoading,
  } = useInfinitePhotos();

  const { mutate: deletePhotosMutate } = Mutations().useDeletePhotos();
  const closeAlert = (idx: number) => {
    isAlerts[idx] = false;
    setIsAlerts([...isAlerts]);
  };

  const deletePhotos = () => {
    // TODO : 삭제

    deletePhotosMutate(Array.from(selectedPhotos));
    setIsSelect(false);
    closeAlert(0);
  };

  const isAlbumLoading = () => {
    return getPhotosIsLoading || getDetailIsLoading;
  };

  function download(imageUrl: string) {
    axios({
      url: imageUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const downloadPhotos = () => {
    // TODO : 다운로드
    let downloads: string[] = [];
    getPhotosPages?.pages.map((photosPage) => {
      photosPage.albumPhotoList.forEach((photo) => {
        if (selectedPhotos.has(photo.photoId)) {
          downloads.push(photo.originUrl);
        }
      });
    });

    downloads.forEach((url) => {
      download(url);
    });

    closeAlert(1);
  };

  const moveTop = () => {
    window.scrollTo(0, 0);
  };

  const moveTopSmooth = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    moveTop();
  }, []);

  // 로딩이 완료되면 user id 배열 수정
  useEffect(() => {
    if (getDetail) {
      setMembersId([
        ...getDetail.members.map((member) => {
          dispatch(addUserIdState(member.id));
          return member.id;
        }),
      ]);
    }
  }, [getDetailIsLoading]);

  // 전체 선택 누르면 전부 선택 / 해제 누르면 전부 해제
  useEffect(() => {
    isTotal
      ? setSelectedPhotos(new Set(getTotalId))
      : setSelectedPhotos(new Set());
    !isSelect && setSelectedPhotos(new Set());
    !isSelect && setIsTotal(false);
  }, [isTotal, isSelect]);

  // 전체 크기만큼 선택하면 전체선택 토글
  useEffect(() => {
    selectedPhotos.size === getTotal && setIsTotal(true);
  }, [selectedPhotos]);

  return (
    <section>
      <NavBar
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        isTotal={isTotal}
        setIsTotal={setIsTotal}
      />
      <div className={`${styles.container}`}>
        <Members membersId={membersId} isAlbumLoading={isAlbumLoading} />
        <Categories />
        <Photos
          isSelect={isSelect}
          selectedPhotos={selectedPhotos}
          setSelectedPhotos={setSelectedPhotos}
          inputPhoto={inputPhoto}
          setInputPhoto={setInputPhoto}
          isAlbumLoading={isAlbumLoading}
        />
        <div className={`${styles.total_count}`}>
          <span>
            {isSelect ? (
              `${selectedPhotos.size}장의 사진이 선택됨`
            ) : isAlbumLoading() ? (
              <LoadingCount />
            ) : (
              `${getTotal}장의 사진`
            )}
          </span>
        </div>
      </div>
      <TabBar
        isSelect={isSelect}
        isAlerts={isAlerts}
        setIsAlerts={setIsAlerts}
        selectedPhotos={selectedPhotos}
      />
      <aside onClick={moveTopSmooth} className={styles.up_btn}>
        <div>
          <UpIcon width={"28px"} height={"28px"} stroke={"#3d3e3e"} />
        </div>
      </aside>
      {isPreview && <Preview inputPhoto={inputPhoto} />}
      {isAlerts[0] && (
        <Alert
          msg="정말 삭제 하시겠습니까?"
          yesHandler={deletePhotos}
          noHandler={() => closeAlert(0)}
        />
      )}
      {isAlerts[1] && (
        <Alert
          msg="다운로드 하시겠습니까?"
          yesHandler={downloadPhotos}
          noHandler={() => closeAlert(1)}
        />
      )}
      <AnimatePresence>
        {isAlerts[3] && (
          <EditAlbumName
            msg="앨범 이름 변경"
            prev={getDetail ? getDetail.album_name : ""}
            albumId={albumId}
            noHandler={() => closeAlert(3)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default AlbumDetail;
