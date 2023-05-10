import React from "react";
import PlusIcon from "public/icons/PlusMainColor.svg";
import { useDispatch } from "react-redux";
import {
  setPreviewLength,
  setUploadLength,
  startPreview,
} from "@/features/photoUploadSlice";

interface NewPhotoType {
  inputPhoto: FileList | null;
  setInputPhoto: React.Dispatch<React.SetStateAction<FileList | null>>;
}

function NewPhoto({ setInputPhoto }: NewPhotoType) {
  // TODO : useRef 타입 any 처리하기
  const fileInput = React.useRef<any>(null);
  let dispatch = useDispatch();
  const inputPhoto = () => {
    fileInput.current.click();
  };
  const test = () => {
    if (fileInput.current.files) {
      const files = fileInput.current.files;
      const filesLength = files.length;

      setInputPhoto(files);
      dispatch(setUploadLength({ uploadLength: filesLength }));
      dispatch(setPreviewLength({ previewLength: filesLength }));
      dispatch(startPreview());
    }
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
        onInput={test}
        accept="image/jpg,image/png,image/jpeg,image/gif"
        style={{ display: "none" }}
        className="upload"
      />
      <PlusIcon width={"8.205vw"} height={"8.205vw"} />
    </div>
  );
}

export default NewPhoto;
