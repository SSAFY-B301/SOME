import { useRouter } from "next/router";

function AlbumDetail() {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.back()}>
        <span>뒤로가기</span>
      </div>
    </>
  );
}

export default AlbumDetail;
