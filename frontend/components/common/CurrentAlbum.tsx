import { CurrentAlbumType } from "@/types/AlbumTypes";
import { useRouter } from "next/router";

// CSS
import styles from "styles/home.module.scss";
import ItemBlock from "./ItemBlock";
import { useGetCurrent } from "@/pages/api/currentAlbumApi";

export default function CurrentAlbum() {
    const router = useRouter();
  
    const { getCurrent } = useGetCurrent();
  
    const currents: React.ReactNode = getCurrent && getCurrent.length !== 0 ? (
      getCurrent.map((currentAlbum: CurrentAlbumType) => (
        <div
          onClick={() => router.push(`/album/${currentAlbum.album_id}`)}
          key={currentAlbum.album_id}
        >
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
                {currentAlbum.photo_list.length <= 10 ? currentAlbum.photo_list.length : "10+"}
              </span>
            </div>
          </div>
          <p className="overflow-hidden whitespace-nowrap text-ellipsis" style={{ fontSize: "3.077vw" }}>{currentAlbum.album_name}</p>
        </div>
      ))
    ) : (
      <p>아직 추가된 사진이 없어요</p>
    );
    return (
      <ItemBlock width="92.308vw" height="28.718vw" radius="16px">
        <div
          className="flex flex-col justify-around w-full h-full"
          style={{ margin: "0px 4.103vw" }}
        >
          <h1 className="font-bold" style={{ fontSize: "5.128vw" }}>
            최근 업로드
          </h1>
          <div className="flex" style={{ gap: "4.103vw" }}>
            {currents}
          </div>
        </div>
      </ItemBlock>
    );
  }