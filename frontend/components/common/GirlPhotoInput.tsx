import { useEffect, useRef, useState } from "react";
import PlusIcon from "public/icons/Plus.svg";
import styles from "styles/home.module.scss";
import { useMutationGirl } from "@/pages/api/girlApi";

export default function GirlPhotoInput() {
    const fileInput = useRef<any>(null);
    const {girlUploadMutation} = useMutationGirl();
    const [inputPhoto, setInputPhoto] = useState<FileList | null>(null)
    const photoInputHandler = () => {
        fileInput.current.click();
    };

    const changeInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPhoto(e.target.files);
    };

    useEffect(() => {
      if (inputPhoto !== null) {
        let formData = new FormData();
        Array.from(inputPhoto).forEach(file => {
            formData.append("multipartFile", file);
        });
        girlUploadMutation({
            formData : formData
        });
    }
      return () => {
      }
    }, [inputPhoto])
    

    return(
        <div
            onClick={photoInputHandler}
            className={`fixed z-50 left-auto right-auto flex justify-center items-center rounded-full ${styles.plus_btn}`}
            style={{ width: "16.41vw", height: "16.41vw" }}
          >
            <input 
              type="file"
              multiple
              ref={fileInput}
              onChange={changeInputPhoto}
              accept="image/jpg,image/png,image/jpeg,image/gif"
              style={{display:"none"}} />
            <PlusIcon />
          </div>
    )
};
