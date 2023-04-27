import styles from "styles/album.module.scss";

import PlusIcon from "@/public/icons/PlusMainColor.svg";
import React from "react";

interface NewPhotoType {
  setPreviewPhoto: React.Dispatch<React.SetStateAction<any>>;
}

// TODO : 사진 업로드 기능 추가
function NewPhoto({ setPreviewPhoto }: NewPhotoType) {
  // TODO : useRef 타입 any 처리하기
  const fileInput = React.useRef<any>(null);
  const inputPhoto = () => {
    fileInput.current.click();
  };

  const changeInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div
      onClick={inputPhoto}
      className="bg-bg-home flex justify-center items-center"
      style={{ width: "22.564vw", height: "22.564vw" }}
    >
      <input
        type="file"
        multiple
        ref={fileInput}
        onChange={changeInputPhoto}
        accept="image/jpg,image/png,image/jpeg,image/gif"
        style={{ display: "none" }}
      />
      <PlusIcon width={"8.205vw"} height={"8.205vw"} />
    </div>
  );
}

export default NewPhoto;
