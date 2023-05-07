// 라이브러리
import React, { useEffect, useState } from "react";

// 컴포넌트
import NavBar from "@/components/common/Nav";
import TabBar from "@/components/common/TabBar";

// CSS
import styles from "@/styles/home.module.scss";

import {Circle, CustomOverlayMap, Map, MapMarker} from "react-kakao-maps-sdk";
import { userQuery } from "./api/userApi";

interface LocationType{
  lat : number,
  lng : number,
}

export default function Home() {
  const [userLocation, setUserLocation] = useState<LocationType>({lat : 33.5563, lng : 126.79581 });
  const {getUserInfo} = userQuery();

  useEffect(() => {
    //https 요청 시에만 GeoLocation 정보를 받아올 수 있다.
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({lat : position.coords.latitude, lng : position.coords.longitude});
    });
  },[])
  
  return (
    <div
      className={`bg-bg-home dark:bg-dark-bg-home relative touch-none ${styles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <NavBar />
      <Map
        className="z-0"
        center={{lat : userLocation.lat, lng:userLocation.lng}}
        style={{width : "100vw", height:"85vh"}}
      >
        <CustomOverlayMap position={{lat : userLocation.lat, lng:userLocation.lng}}>
          <img className="rounded-full" src={getUserInfo ? getUserInfo.user_img : ""} alt="" />
        </CustomOverlayMap>
      </Map>
      <div className={`${styles.footer}`}>
        <TabBar plusBtnUrl={"/album/create"} />
      </div>
    </div>
  );
}
