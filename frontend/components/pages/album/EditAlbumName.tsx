import { Mutations } from "@/pages/api/albumApi";
import { usePutAlbumNameType } from "@/types/AlbumTypes";
import { useState } from "react";

interface AlertType {
  msg: string;
  prev: string;
  albumId: number;
  noHandler: () => void;
}

export default function EditAlbumName(props: AlertType) {
  const [inputData, setInputData] = useState<string>(props.prev);
  const [isBlank, setIsBlank] = useState(false);
  const onChange = (value: string) => {
    setInputData(value);
    setIsBlank(false);
  };

  const { mutate } = Mutations().usePutAlbumName(props.albumId);
  const editAlbumName = () => {
    if (inputData) {
      const body: usePutAlbumNameType = {
        album_id: props.albumId,
        new_album_name: inputData,
      };
      mutate(body);
      props.noHandler();
    } else {
      setIsBlank(true);
    }
  };
  return (
    <div
      onClick={props.noHandler}
      className=" top-0 flex items-center justify-center bg-black bg-opacity-40 z-10 fixed"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center w-64 bg-white rounded-lg h-32 gap-y-4"
      >
        <p>{props.msg}</p>
        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${isBlank ? "이름을 입력해 주세요." : ""}`}
          value={inputData}
          className={`border ${
            isBlank
              ? " border-red-600 placeholder:text-red-600 placeholder:text-base placeholder:text-opacity-80"
              : "border-black"
          } rounded-2xl px-2 `}
        />
        <div className="flex items-center justify-center gap-x-4">
          <button onClick={editAlbumName} className="w-24 rounded-lg shadow">
            수정
          </button>
          <button onClick={props.noHandler} className="w-24 rounded-lg shadow">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
