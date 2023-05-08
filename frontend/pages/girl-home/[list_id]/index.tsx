import { InfoBar } from "@/components/common/Nav";
import GirlListUser from "@/public/icons/GirlListUsers.svg"
import GirlListImage from "@/public/icons/GirlListImage.svg"

import { Map } from "react-kakao-maps-sdk";

interface GirlListParamType{
    lat : number,
    lng : number,
}
export default function List(params : GirlListParamType) {
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
            <div className="grid w-full grid-cols-4 gap-1 px-2">
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
                <div className="col-span-1 bg-cover" style={{width : "88px", height: "88px", backgroundImage : `url(${"https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80"})`}}></div>
            </div>
            <Map
                center={{lat : params.lat, lng: params.lng}}
                style={{width : "100vw", height:"50vh"}}
                level={1}>
            </Map>
        </div>
    )
};
