import { Mutations } from "@/pages/api/albumApi";
import { usePutAlbumNameType } from "@/types/AlbumTypes";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        onClick={props.noHandler}
        className=" top-0 flex items-center justify-center bg-black bg-opacity-40 z-10 fixed"
        style={{ width: "100vw", height: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center  bg-white dark:bg-dark-block rounded-lg  gap-y-4"
          initial={{ opacity: 0, width: "0px", height: "0px" }}
          animate={{ opacity: 1, width: "256px", height: "128px" }}
          exit={{ opacity: 0, width: "0px", height: "0px" }}
        >
          <p>{props.msg}</p>
          <motion.input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            placeholder={`${isBlank ? "이름을 입력해 주세요." : ""}`}
            value={inputData}
            initial={{ opacity: 0, width: "0px" }}
            animate={{ opacity: 1, width: "228px" }}
            exit={{ opacity: 0, width: "0px" }}
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
            <button
              onClick={props.noHandler}
              className="w-24 rounded-lg shadow"
            >
              취소
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
