import React from "react";
import PlusIcon from "public/icons/PlusMainColor.svg";

interface NewPhotoType {
  setInputPhoto: React.Dispatch<React.SetStateAction<FileList | null>>;
}

// TODO : 사진 업로드 기능 추가
function NewPhoto({ setInputPhoto }: NewPhotoType) {
  // TODO : useRef 타입 any 처리하기
  const fileInput = React.useRef<any>(null);
  const inputPhoto = () => {
    fileInput.current.click();
  };

  const changeInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO : 콘솔 지우기
    e.target.files && setInputPhoto(e.target.files);
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
