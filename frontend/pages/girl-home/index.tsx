// 라이브러리
import React, { useEffect, useState } from "react";

// 컴포넌트
import NavBar from "@/components/common/Nav";
import TabBar from "@/components/common/TabBar";

// CSS
import homeStyles from "@/styles/home.module.scss";
import girlStyles from "@/styles/girl.module.scss";

import {CustomOverlayMap, Map} from "react-kakao-maps-sdk";
import { userQuery } from "../api/userApi";

import { useRouter } from "next/router";
import { getGirlList } from "../api/girlApi";
import { GirlListMarkGpsType, GirlReusltListType } from "@/types/GirlType";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "@/features/locationSlice";
import { RootState } from "@/store/configureStore";
import { useQueryClient } from "react-query";
import { setGirlListDetailState } from "@/features/girlListDetailSlice";

export default function Home() {
  
  //router
  const router = useRouter()
  
  //redux
  const location = useSelector((state : RootState) => state.location);
  const girlListDetailState = useSelector((state : RootState) => state.girlListDetailState);
  const dispatch = useDispatch();
  
  //react-query
  const {getUserInfo, userStatus} = userQuery();
  const {resultData} = getGirlList();
  const queryClient = useQueryClient();
  
  function openDetailList(result : GirlListMarkGpsType){
    dispatch(setGirlListDetailState({
      section : result.section,
      latitude : result.latitude,
      longitude : result.longitude,
      page : 0,
      size : 12,
      order : "like",
    }))
    router.push("/girl-home/list")
  }
  function locationPermissionSuccess(position : GeolocationPosition){
    dispatch(changeLocation({lat: position.coords.latitude, lng : position.coords.longitude}));
  }
  function locationPermissionError(err : GeolocationPositionError){
    //에러 처리 부분
  }
  useEffect(() => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(locationPermissionSuccess, locationPermissionError);
    }
    //https 요청 시에만 GeoLocation 정보를 받아올 수 있다.
  },[])
  return (
    <div
      className={`bg-bg-home dark:bg-dark-bg-home relative touch-none ${homeStyles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <NavBar />
      <Map
        className="z-0"
        center={{lat : location.lat, lng:location.lng}}
        style={{width : "100vw", height:"90vh"}}
        level={2}
        zoomable={false}
        draggable={false}
      >
        <CustomOverlayMap key={5} position={{lat : location.lat, lng:location.lng}}>
          <div className="relative w-52 h-52">
            <div className={`absolute w-52 h-52 rounded-full ${girlStyles.loader_back} ${girlStyles.loader_animation} ${girlStyles.loader}`}></div>
            {userStatus === "success" &&
              <div className={`top-20 left-20 z-10 absolute w-12 h-12 bg-center bg-cover rounded-full ${girlStyles.inner}`} style={{backgroundImage : `url(${getUserInfo.user_img})`}}></div>
            }
            {userStatus !== "success" && 
              <div  className={`top-20 left-20 z-10 absolute w-12 h-12 bg-gray-400 rounded-full`}></div>
            }
          </div>
        </CustomOverlayMap>
        {resultData !== undefined && <>
          {resultData.resultList.map((result, index) => {
            if (result.photoList.length !== 0){
              return (
                <CustomOverlayMap key={index} position={{lat : result.markGps.latitude, lng : result.markGps.longitude}}>
                  <div onClick={() => openDetailList(result.markGps)} className="relative w-24 h-24 bg-white rounded-lg shadow-md">
                    <div style={{background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"}} className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -right-2 -top-2">
                      <p className="text-xs text-white">{result.totalPhotoCnt}</p>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-1 px-1.5 py-1.5">
                        {result.photoList.map((photo) => 
                            <img key={photo.photoId} className="w-10 h-10 rounded-sm" src={photo.s3Url} alt="" />
                        )}
                    </div>
                  </div>
                </CustomOverlayMap>          
              )
            }
          })}
        </>}
      </Map>
      <div className={`${homeStyles.footer}`}>
        <TabBar/>
      </div>
    </div>
  );
}
