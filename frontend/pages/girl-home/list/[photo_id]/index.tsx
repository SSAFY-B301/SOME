import { InfoBar } from "@/components/common/Nav";
import FillHeart from "@/public/icons/FillHeart.svg";
import OutLineHeart from "@/public/icons/OutLineHeart.svg";
import TabBar from "@/components/common/TabBar";
import { getGirlPhotoDetail, useMutationGirl } from "@/pages/api/girlApi";
import { PhotoTime } from "@/components/pages/notification/AlarmTime";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

export default function GirlDetail() {
  const { resultData, girlDetailStatus } = getGirlPhotoDetail();
  const { girlLikeMutation } = useMutationGirl();
  const addressState = useSelector((state: RootState) => state.addressState);
  function likeHandler(nowPhotoId: number, likeStatus: boolean) {
    girlLikeMutation({ photo_id: nowPhotoId, like_photo_status: likeStatus });
  }

  return (
    <div className="flex flex-col items-center gap-y-2">
      <InfoBar title={addressState.address}></InfoBar>
      <div
        className="flex justify-between px-6"
        style={{ width: "100vw", height: "48px", marginTop: "8px" }}
      >
        <div className="flex items-center justify-center gap-x-4">
          <div
            className="items-center justify-center w-10 h-10 bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${resultData?.userProfileImg})` }}
          ></div>
          <div className="flex flex-col items-center justify-center h-10">
            <p className="text-lg font-bold">
              {resultData ? resultData.userName : ""}
            </p>
            <PhotoTime
              time={resultData ? resultData.uploadedDate : ""}
            ></PhotoTime>
          </div>
        </div>
        <div>
          {girlDetailStatus === "success" && (
            <div
              onClick={() =>
                likeHandler(resultData.photoId, resultData.userLikeStatus)
              }
            >
              {resultData.userLikeStatus ? (
                <FillHeart></FillHeart>
              ) : (
                <OutLineHeart></OutLineHeart>
              )}
            </div>
          )}
          <p className="text-center text-gray-700 dark:text-white">
            {resultData ? resultData.likeCnt : 0}
          </p>
        </div>
      </div>
      <div
        className="flex flex-col justify-center"
        style={{ width: "100vw", height: "70vh" }}
      >
        {girlDetailStatus === "success" && (
          <Image
            src={resultData.s3Url}
            alt="photo"
            loading="lazy"
            width={390}
            height={500}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      <TabBar />
    </div>
  );
}
