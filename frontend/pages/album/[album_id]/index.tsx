// 컴포넌트
import Photos from "components/pages/album/Photos";
import Categories from "components/pages/album/Categories";
import Members from "components/pages/album/Members";
import NavBar from "components/pages/album/NavBar";
import TabBar from "components/pages/album/TabBar";

// 라이브러리
import { useEffect, useMemo, useState } from "react";

// API
import { useGetDetail, useGetPhotos } from "pages/api/albumApi";

// CSS
import styles from "styles/album.module.scss";
import Preview from "components/pages/album/Preview";

// 타입
import { previewPhotoType, requestPhotosType } from "types/AlbumTypes";
import { useRouter } from "next/router";

function AlbumDetail() {
  const router = useRouter();
  const albumId: number = Number(router.query.album_id);
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
  const [previewPhotos, setPreviewPhotos] = useState<previewPhotoType[]>([]);

  const photosRequest: requestPhotosType = {
    albumId: albumId,
    categoryId: selectedCategory,
    userId: Array.from(selectMembers).toString(),
  };

  const { getTotal, getTotalId } = useGetPhotos(photosRequest);

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

  if (getTotal && getTotalId) {
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
  }

  /**
   * size 길이의 배열 반환
   * @param size
   * @param start
   * @returns
   */
  const range = (size: number, start = 0) => {
    return Array.from({ length: size }, (_, index) => index + start);
  };

  // 사진 미리보기
  useEffect(() => {
    if (inputPhoto) {
      console.log(inputPhoto);

      range(inputPhoto.length).forEach((idx) => {
        setIsPreview(true);
        setPreviewPhotos([]);
        previewPhotos.push({
          id: idx,
          img: URL.createObjectURL(inputPhoto.item(idx)!),
        });
      });
      setPreviewPhotos([...previewPhotos]);
    }
  }, [inputPhoto]);

  useEffect(() => {
    !isPreview && setPreviewPhotos([]);
  }, [isPreview]);

  return (
    <section>
      <NavBar
        isSelect={isSelect}
        setIsSelect={setIsSelect}
        isTotal={isTotal}
        setIsTotal={setIsTotal}
      />
      <div className={`${styles.container}`}>
        <Members
          selectMembers={selectMembers}
          setSelectMembers={setSelectMembers}
          membersId={membersId}
        />
        <Categories
          selectedId={selectedCategory}
          setSelectedId={setSelectedCategory}
        />
        <Photos
          isSelect={isSelect}
          selectedCategory={selectedCategory}
          selectedPhotos={selectedPhotos}
          setSelectedPhotos={setSelectedPhotos}
          selectMembers={selectMembers}
          setInputPhoto={setInputPhoto}
        />
        <div className={`${styles.total_count}`}>
          <span>
            {isSelect
              ? `${selectedPhotos.size}장의 사진이 선택됨`
              : `${getDetail ? getTotal : 0}장의 사진`}
          </span>
        </div>
      </div>
      <TabBar isSelect={isSelect} />
      {isPreview && (
        <Preview
          previewPhotos={previewPhotos}
          photoLength={inputPhoto ? inputPhoto.length : 0}
          setIsPreview={setIsPreview}
        />
      )}
    </section>
  );
}

export default AlbumDetail;
