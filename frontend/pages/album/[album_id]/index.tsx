// 컴포넌트
import Photos from "components/pages/album/Photos";
import Categories from "components/pages/album/Categories";
import Members from "components/pages/album/Members";
import NavBar from "components/pages/album/NavBar";
import TabBar from "components/pages/album/TabBar";

// 라이브러리
import { useEffect, useMemo, useState } from "react";

// API
import {
  Mutations,
  useGetDetail,
  useGetPhotos,
  useInfinitePhotos,
} from "pages/api/albumApi";

// CSS
import styles from "styles/album.module.scss";
import Preview from "components/pages/album/Preview";

// 타입
import { useRouter } from "next/router";
import Alert from "@/components/common/Alert";
import EditAlbumName from "@/components/pages/album/EditAlbumName";
import axios from "axios";
import { LoadingCount } from "@/components/common/Loading";

function AlbumDetail() {
  const router = useRouter();
  const albumId = useMemo(
    () => Number(router.query.album_id),
    [router.query.album_id]
  );

  const { getDetail, getDetailIsLoading } = useGetDetail(albumId);

  const [membersId, setMembersId] = useState<number[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [isTotal, setIsTotal] = useState<boolean>(false);

  const [selectMembers, setSelectMembers] = useState<Set<number>>(
    new Set(membersId)
  );
  const [inputPhoto, setInputPhoto] = useState<FileList | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const [isAlerts, setIsAlerts] = useState<boolean[]>(
    [...Array(4)].fill(false)
  );

  const makeRequest = () => {
    return {
      albumId: albumId,
      categoryId: selectedCategory,
      userId: Array.from(selectMembers).toString(),
    };
  };

  const photosRequest = useMemo(
    () => makeRequest(),
    [albumId, selectedCategory, selectMembers]
  );

  // TODO : 지우기
  const { getPhotos, getTotal, getTotalId, getPhotosIsLoading, refetch } =
    useGetPhotos(photosRequest);

  const { data: getPhotosPages, isLoading } = useInfinitePhotos(photosRequest);

  useEffect(() => {
    refetch();
  }, [photosRequest]);

  const { mutate: deletePhotosMutate } = Mutations().useDeletePhotos(albumId);

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
    Array.from(selectedPhotos).map((photoId) => {
      const imageUrl = getPhotos?.find(
        (photo) => photo.photoId === photoId
      )?.s3Url;
      imageUrl && download(imageUrl);
    });
    closeAlert(1);
  };

  // 로딩이 완료되면 user id 배열 수정
  useEffect(() => {
    if (getDetail) {
      setMembersId([...getDetail.members.map((member) => member.id)]);
    }
  }, [getDetailIsLoading]);

  // user id 배열을 선택 set에 저장
  useEffect(() => {
    setSelectMembers(new Set(membersId));
  }, [membersId]);

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
  // useMemo(() => selectedPhotos.size === getTotal && true, [selectedPhotos])

  /**
   * size 길이의 배열 반환
   * @param size
   * @param start
   * @returns
   */

  useEffect(() => {
    if (inputPhoto) {
      setIsPreview(true);
    }
  }, [inputPhoto]);

  return (
    <section>
      <NavBar
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        isTotal={isTotal}
        setIsTotal={setIsTotal}
        isAlbumLoading={isAlbumLoading}
      />
      <div className={`${styles.container}`}>
        <Members
          selectMembers={selectMembers}
          setSelectMembers={setSelectMembers}
          membersId={membersId}
          isAlbumLoading={isAlbumLoading}
        />
        <Categories
          selectedId={selectedCategory}
          setSelectedId={setSelectedCategory}
        />
        <Photos
          isSelect={isSelect}
          selectedPhotos={selectedPhotos}
          setSelectedPhotos={setSelectedPhotos}
          inputPhoto={inputPhoto}
          setInputPhoto={setInputPhoto}
          photosRequest={photosRequest}
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
      />
      {isPreview && (
        <Preview
          photoLength={inputPhoto ? inputPhoto.length : 0}
          setIsPreview={setIsPreview}
          inputPhoto={inputPhoto}
        />
      )}
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
      {isAlerts[3] && (
        <EditAlbumName
          msg="앨범 이름 변경"
          prev={getDetail ? getDetail.album_name : ""}
          albumId={albumId}
          noHandler={() => closeAlert(3)}
        />
      )}
    </section>
  );
}

export default AlbumDetail;
