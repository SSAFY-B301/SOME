// 라이브러리
import React from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

// 컴포넌트
import Photo from "components/common/Photo";
import NewPhoto from "components/pages/album/NewPhoto";

// CSS
import styles from "styles/album.module.scss";
import { useGetPhotos, useInfinitePhotos } from "@/pages/api/albumApi";
import {
  PhotoPageType,
  PhotoType,
  requestPhotosType,
} from "@/types/AlbumTypes";
import { LoadingPhoto } from "@/components/common/Loading";

// 인터페이스
interface PhotosType {
  isSelect: boolean;
  selectedPhotos: Set<number>;
  setSelectedPhotos: React.Dispatch<React.SetStateAction<Set<number>>>;
  inputPhoto: FileList | null;
  setInputPhoto: React.Dispatch<React.SetStateAction<FileList | null>>;
  photosRequest: requestPhotosType;
  isAlbumLoading: () => boolean;
}

/**
 * 사진들이 표시되는 컴포넌트
 * @param isSelect 선택 여부
 * @param selectedPhotos 선택된 사진들 Set
 * @param setSelectedPhotos 선택된 사진들 Set의 Setter 함수
 * @param setInputPhoto 선택된 멤버들 Set의 Setter 함수
 * @returns
 */
function Photos({
  isSelect,
  selectedPhotos,
  setSelectedPhotos,
  inputPhoto,
  setInputPhoto,
  photosRequest,
  isAlbumLoading,
}: PhotosType) {
  const router = useRouter();

  // const { getPhotos } = useGetPhotos(photosRequest);
  const {
    data: getPhotosPages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfinitePhotos(photosRequest);

  /**
   * 사진 선택 상태 바꾸기
   * @param id 사진 id
   */
  const changeSelect = (id: number) => {
    selectedPhotos.has(id) ? selectedPhotos.delete(id) : selectedPhotos.add(id);
    setSelectedPhotos(new Set(selectedPhotos));
  };

  /**
   * 사진 보기 페이지로 이동
   * @param id 사진 id
   */
  const goPhoto = (id: number) => {
    router.push(`${router.asPath}/${id}`);
  };

  return (
    <InfiniteScroll
      className={`${styles.photos} grid grid-cols-4`}
      hasMore={hasNextPage}
      loadMore={() => fetchNextPage()}
      // isReverse={true}
      loader={<LoadingPhotos />}
      threshold={100}
    >
      {isAlbumLoading() ? (
        // TODO : 로딩중
        <LoadingPhotos />
      ) : (
        <>
          {!isSelect && (
            <NewPhoto inputPhoto={inputPhoto} setInputPhoto={setInputPhoto} />
          )}
          {getPhotosPages ? (
            getPhotosPages.pages.map((page: PhotoPageType) =>
              page.content.map((photo) => (
                <div
                  key={photo.photoId}
                  onClick={() =>
                    isSelect
                      ? changeSelect(photo.photoId)
                      : goPhoto(photo.photoId)
                  }
                >
                  <Photo
                    key={photo.photoId}
                    width={"22.564vw"}
                    height={"22.564vw"}
                    selectedPhotos={selectedPhotos}
                    photoId={photo.photoId}
                    img={photo.s3Url}
                  />
                </div>
              ))
            )
          ) : (
            <></>
          )}
          {/* {!isSelect && (
            <NewPhoto inputPhoto={inputPhoto} setInputPhoto={setInputPhoto} />
          )} */}
        </>
      )}
    </InfiniteScroll>
  );
}

function LoadingPhotos() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <LoadingPhoto key={i} />
      ))}
    </>
  );
}

export default Photos;
