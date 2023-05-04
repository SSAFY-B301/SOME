import { Mutations } from "@/pages/api/albumApi";
import { usePutAlbumNameType } from "@/types/AlbumTypes";
import { useState } from "react";

interface AlertType {
  msg: string;
  albumId: number;
  noHandler: () => void;
}

export default function EditAlbumName(props: AlertType) {
  const [inputData, setInputData] = useState<string>("");

  const onChange = (value: string) => {
    setInputData(value);
  };

  const { mutate } = Mutations().usePutAlbumName(props.albumId);
  const editAlbumName = () => {
    const body: usePutAlbumNameType = {
      album_id: props.albumId,
      new_album_name: inputData,
    };
    mutate(body);
    props.noHandler();
  };
  return (
    <div
      onClick={props.noHandler}
      className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center w-64 bg-white rounded-lg h-32 gap-y-4"
      >
        <p>{props.msg}</p>
        <input type="text" onChange={(e) => onChange(e.target.value)} />
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
