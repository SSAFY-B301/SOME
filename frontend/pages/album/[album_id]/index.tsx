// 컴포넌트
import Photos from "components/pages/album/Photos";
import Categories from "components/pages/album/Categories";
import Members from "components/pages/album/Members";
import NavBar from "components/pages/album/NavBar";
import TabBar from "components/pages/album/TabBar";

// 라이브러리
import { useEffect, useMemo, useState } from "react";

// API
import { albumInfo as albumInfoData } from "pages/api/albumDummyApi";
import { useGetDetail, useGetPhotos } from "pages/api/albumApi";

// CSS
import styles from "styles/album.module.scss";
import Preview from "components/pages/album/Preview";

// 타입
import { previewPhotoType } from "types/AlbumTypes";

function AlbumDetail() {
  const { getDetail, getDetailIsLoading } = useGetDetail();
  const [albumInfo, setAlbumInfo] = useState(albumInfoData.data);

  // const membersId = albumInfo.members.map((member) => member.id);
  // const membersSize = membersId.length;

  // useEffect(() => {
  //   const membersId = useMemo(
  //     () => getDetail?.data.members.map((member) => member.id),
  //     [getDetailIsLoading]
  //   );
  //   const membersSize = useMemo(() => membersId.length, [membersId]);
  // }, [getDetailIsLoading]);

  const membersId = useMemo(
    () => albumInfo.members.map((member) => member.id),
    [getDetailIsLoading]
  );
  const membersSize = useMemo(() => membersId.length, [membersId]);

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

  // 페이지 빠져나올 때 API 요청하기
  useEffect(() => {
    return () => {
      // TODO : API 보내기 추가
    };
  }, [albumInfo]);

  // 전체 선택 누르면 전부 선택 / 해제 누르면 전부 해제
  useEffect(() => {
    isTotal
      ? setSelectedPhotos(new Set(getDetail?.data.totalId))
      : setSelectedPhotos(new Set());
    !isSelect && setSelectedPhotos(new Set());
    !isSelect && setIsTotal(false);
  }, [isTotal, isSelect]);

  // 전체 크기만큼 선택하면 전체선택 토글
  useEffect(() => {
    selectedPhotos.size === albumInfo.total && setIsTotal(true);
  }, [selectedPhotos]);

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
          membersSize={membersSize}
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
              : `${albumInfo.total}장의 사진`}
          </span>
        </div>
      </div>
      <TabBar
        albumInfo={albumInfo}
        setAlbumInfo={setAlbumInfo}
        isSelect={isSelect}
      />
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
