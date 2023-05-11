import { InfoBar } from "@/components/common/Nav";
import { useState } from "react";
import FillHeart from "@/public/icons/FillHeart.svg"
import OutLineHeart from "@/public/icons/OutLineHeart.svg"
import TabBar from "@/components/common/TabBar";
import { getGirlPhotoDetail } from "@/pages/api/girlApi";
import { PhotoTime } from "@/components/pages/notification/AlarmTime";


export default function GirlDetail() {
    const {resultData} = getGirlPhotoDetail();
    const [isLike, SetIsLike] = useState<boolean>(resultData?.userLikeStatus);
    return (
        <div className="flex flex-col items-center gap-y-4">
            <InfoBar title={"대전시 유성구"}></InfoBar>
            <div className="flex justify-between px-6" style={{width : "100vw"}}>
                <div className="flex gap-x-4">
                    <div className="w-12 h-12 bg-center bg-cover rounded-lg" style={{backgroundImage : `url(${resultData?.userProfileImg})`}}></div>
                    <div>
                        <p className="text-lg font-bold">{resultData ? resultData.userName : ""}</p>
                        <PhotoTime time={resultData ? resultData.uploadedDate : ""}></PhotoTime>
                    </div>
                </div>
                <div>
                    <div onClick={() => SetIsLike(!isLike)}>
                        {isLike && <FillHeart></FillHeart>}
                        {!isLike && <OutLineHeart></OutLineHeart>}
                    </div>
                    <p className="text-center text-gray-700">{resultData ? resultData.likeCnt : 0}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center" style={{width: "100vw", height: "70vh"}}>
                <img src={resultData ? resultData.s3Url : ""} alt="" />
            </div>
            <TabBar/>
        </div>
    )
};
