import { InfoBar } from "@/components/common/Nav";
import FillHeart from "@/public/icons/FillHeart.svg";
import OutLineHeart from "@/public/icons/OutLineHeart.svg";
import TabBar from "@/components/common/TabBar";
import { getGirlPhotoDetail, useMutationGirl } from "@/pages/api/girlApi";
import { PhotoTime } from "@/components/pages/notification/AlarmTime";
import { default as ImageTag } from "next/image";
import { useEffect } from "react";

export default function GirlDetail() {
  const { resultData, girlDetailStatus } = getGirlPhotoDetail();
  const { girlLikeMutation } = useMutationGirl();
  function likeHandler(nowPhotoId: number, likeStatus: boolean) {
    girlLikeMutation({ photo_id: nowPhotoId, like_photo_status: likeStatus });
  }

  // let img = new Image();
  // useEffect(() => {
  //   if (resultData) {
  //     img.src = resultData.s3Url;
  //   }
  // }, [resultData]);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <InfoBar title={"대전시 유성구"}></InfoBar>
      <div className="flex justify-between px-6" style={{ width: "100vw" }}>
        <div className="flex gap-x-4">
          <div
            className="w-12 h-12 bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url(${resultData?.userProfileImg})` }}
          ></div>
          <div>
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
          <p className="text-center text-gray-700">
            {resultData ? resultData.likeCnt : 0}
          </p>
        </div>
      </div>
      <div
        className="flex flex-col justify-center"
        style={{ width: "100vw", height: "70vh" }}
      >
        {/* <ImageTag
          src={resultData ? resultData.s3Url : ""}
          alt="photo"
          loading="lazy"
          width={img.width}
          height={img.height}
        /> */}
        <img src={resultData ? resultData.s3Url : ""} alt="" />
      </div>
      <TabBar />
    </div>
  );
}
