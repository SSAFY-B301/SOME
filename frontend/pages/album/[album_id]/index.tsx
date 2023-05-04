// 컴포넌트
import Photos from "components/pages/album/Photos";
import Categories from "components/pages/album/Categories";
import Members from "components/pages/album/Members";
import NavBar from "components/pages/album/NavBar";
import TabBar from "components/pages/album/TabBar";

// 라이브러리
import { useEffect, useMemo, useState } from "react";

// API
import { Mutations, useGetDetail, useGetPhotos } from "pages/api/albumApi";

// CSS
import styles from "styles/album.module.scss";
import Preview from "components/pages/album/Preview";

// 타입
import { previewPhotoType, requestPhotosType } from "types/AlbumTypes";
import { useRouter } from "next/router";
import Alert from "@/components/common/Alert";
import EditAlbumName from "@/components/pages/album/EditAlbumName";
import axios from "axios";

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

  const [isAlerts, setIsAlerts] = useState<boolean[]>(
    [...Array(4)].fill(false)
  );

  const photosRequest: requestPhotosType = {
    albumId: albumId,
    categoryId: selectedCategory,
    userId: Array.from(selectMembers).toString(),
  };

  const { getTotal, getTotalId } = useGetPhotos(photosRequest);

  const { mutate: deletePhotosMutate } = Mutations().useDeletePhotos();

  const closeAlert = (idx: number) => {
    isAlerts[idx] = false;
    setIsAlerts([...isAlerts]);
  };

  const deletePhotos = () => {
    console.log("DELETE", Array.from(selectedPhotos));

    deletePhotosMutate(Array.from(selectedPhotos));
    closeAlert(0);
  };

  function download() {
    console.log("download");
    axios({
      url: "https://k8b301-bucket.s3.ap-northeast-2.amazonaws.com/%25EB%25A7%2588%25EB%25A3%25A8.jpg",
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
    console.log("DOWNLOAD", Array.from(selectedPhotos));
    // TODO : 다운로드
    const downUrl =
      "https://k8b301-bucket.s3.ap-northeast-2.amazonaws.com/%25EB%25A7%2588%25EB%25A3%25A8.jpg";
    download();
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
  // useMemo(() => selectedPhotos.size === getTotal && true, [selectedPhotos])

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
    console.log(inputPhoto);
    if (inputPhoto) {
      range(inputPhoto.length).forEach((idx) => {
        setIsPreview(true);
        setPreviewPhotos([]);
        previewPhotos.push({
          id: idx,
          img: URL.createObjectURL(inputPhoto.item(idx)!),
        });
      });
      console.log("PREVIEW", previewPhotos);
    }
    setPreviewPhotos([...previewPhotos]);
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
        <a
          href="blob:http://192.168.137.1:3000/5490c48f-1ecc-4b25-a477-6b9e09166f1d"
          download="file.jpg"
        >
          다운로드
        </a>
        <div className={`${styles.total_count}`}>
          <span>
            {isSelect
              ? `${selectedPhotos.size}장의 사진이 선택됨`
              : `${getDetail ? getTotal : 0}장의 사진`}
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
          previewPhotos={previewPhotos}
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
          albumId={albumId}
          noHandler={() => closeAlert(3)}
        />
      )}
    </section>
  );
}

export default AlbumDetail;
