import { useEffect, useState } from "react"

export default function ToggleList() {
    const [toggleSns, setToggleSns] = useState<boolean>(false);
    const [toggleNewAlbum, setToggleNewAlbum] = useState<boolean>(false);

    function snsToggleChange(){
        setToggleSns(!toggleSns);
        //알림 끄는 설정 접근
    }

    function newAlbumToggleChange(){
        setToggleNewAlbum(!toggleNewAlbum);
        //알림 끄는 설정 접근
    }

    return(
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between">
                <p>공유 투표 알림</p>
                <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                    <input type="checkbox" name="toggleSns" id="toggleSns" onChange={snsToggleChange} 
                        className={toggleSns ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all duration-500 translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full duration-500 appearance-none cursor-pointer toggle-checkbox"} />
                    <label htmlFor="toggleSns" 
                        className={toggleSns ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                        style={toggleSns? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
                </div>
            </div>
            <div className="flex justify-between">
                <p>앨범 초대 알림</p>
                <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                    <input type="checkbox" name="toggleNew" id="toggleNew" onChange={newAlbumToggleChange} 
                        className={toggleNewAlbum ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all duration-500 translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full duration-500 appearance-none cursor-pointer toggle-checkbox"} />
                    <label htmlFor="toggleNew" 
                        className={toggleNewAlbum ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                        style={toggleNewAlbum? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
                </div>
            </div>
        </div>
    )
};
