import { InfoBar } from "@/components/common/Nav";
import { useState } from "react";
import FillHeart from "@/public/icons/FillHeart.svg"
import OutLineHeart from "@/public/icons/OutLineHeart.svg"
import TabBar from "@/components/common/TabBar";


export default function GirlDetail() {
    const [isLike, SetIsLike] = useState<boolean>(false);
    return (
        <div className="flex flex-col items-center gap-y-4">
            <InfoBar title={"대전시 유성구"}></InfoBar>
            <div className="flex justify-between px-6" style={{width : "100vw"}}>
                <div className="flex gap-x-4">
                    <div className="w-12 h-12 bg-center bg-cover rounded-lg" style={{backgroundImage : `url(${"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8JUVDJTgyJUFDJUVCJTlFJThDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"})`}}></div>
                    <div>
                        <p className="text-lg font-bold">홍길동</p>
                        <p className="text-sm text-gray-400">2022.04.18 TUE</p>
                    </div>
                </div>
                <div>
                    <div onClick={() => SetIsLike(!isLike)}>
                        {isLike && <FillHeart></FillHeart>}
                        {!isLike && <OutLineHeart></OutLineHeart>}
                    </div>
                    <p className="text-center text-gray-700">24</p>
                </div>
            </div>
            <div className="flex flex-col justify-center" style={{width: "100vw", height: "70vh"}}>
                <img src="https://plus.unsplash.com/premium_photo-1668799886418-2335be7716e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1158&q=80" alt="" />
            </div>
            <TabBar/>
        </div>
    )
};
