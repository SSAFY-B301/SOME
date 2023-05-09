import { InfoBar } from "@/components/common/Nav";
import GirlListUser from "@/public/icons/GirlListUsers.svg"
import GirlListImage from "@/public/icons/GirlListImage.svg"

import { Map } from "react-kakao-maps-sdk";
import { useRouter } from "next/router";
import TabBar from "@/components/common/TabBar";

const Dummy = {
    imgList : ["https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",
                "https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80",]
}

interface GirlListParamType{
    lat : number,
    lng : number,
}
export default function List(params : GirlListParamType) {
    const router = useRouter();
    return(
        <div className="flex flex-col items-center gap-y-4">
            <InfoBar title={"대전시 유성구"}></InfoBar>
            <div className="relative flex items-center justify-center h-12 gap-x-2">
                <GirlListUser></GirlListUser>
                <p>31</p>
                <GirlListImage></GirlListImage>
                <p>100+</p>
                {/* TODO : 정렬 기준 들어가야됨 */}
            </div>
            <Map
                center={{lat : 33.5563, lng: 126.79581}}
                style={{width : "100vw", height:"40vh"}}
                level={1}>
            </Map>
            <div className="grid w-full grid-cols-4 gap-1 px-2">
                {Dummy.imgList.map((img, index) => {
                    return(
                        <div key={index} className="flex items-center justify-center w-full h-full">
                            <div onClick={() => router.push("/girl-home/list/1")} className="col-span-1 bg-cover" style={{width : "80px", height: "80px", backgroundImage : `url(${img})`}}></div>
                        </div>
                    )
                })}
            </div>
            <TabBar></TabBar>
        </div>
    )
};
