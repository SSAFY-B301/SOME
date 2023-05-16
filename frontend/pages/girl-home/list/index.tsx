import { InfoBar } from "@/components/common/Nav";
import GirlListUser from "@/public/icons/GirlListUsers.svg";
import GirlListImage from "@/public/icons/GirlListImage.svg";

import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useRouter } from "next/router";
import TabBar from "@/components/common/TabBar";
import { getGirlListDetail } from "@/pages/api/girlApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { useEffect, useState } from "react";
import CaretDown from "@/public/icons/CaretDown.svg";
import { useQuery } from "react-query";
import axios from "axios";
import LeftIcon from "public/icons/CaretLeft.svg";
import RightIcon from "public/icons/CaretRight.svg";
import styles from "styles/girl.module.scss";
import { setPage } from "@/features/girlListDetailSlice";
import { StateType } from "@/types/StateType";

interface GirlListParamType {
  lat: number;
  lng: number;
}
export default function List() {
  const dispatch = useDispatch();
  const girlDetailList = useSelector(
    (state: RootState) => state.girlListDetailState
  );

  const section = useSelector(
    (state: StateType) => state.girlListDetailState.section
  );
  const latitude = useSelector(
    (state: StateType) => state.girlListDetailState.latitude
  );
  const longitude = useSelector(
    (state: StateType) => state.girlListDetailState.longitude
  );
  const page = useSelector(
    (state: StateType) => state.girlListDetailState.page
  );
  const size = useSelector(
    (state: StateType) => state.girlListDetailState.size
  );
  const order = useSelector(
    (state: StateType) => state.girlListDetailState.order
  );
  const { resultData } = getGirlListDetail();
  const [sort, setSort] = useState("like");
  const [selectOpen, setSelectOpen] = useState(false);
  const router = useRouter();
  const [address, setAddress] = useState("");
  useEffect(() => {
    console.log("page", page);
  }, [page]);
  useEffect(() => {
    console.log("resultData", resultData);
  }, [resultData]);

  async function getLocalInfo() {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_KAKAO_DAPI_URL}/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}`,
        },
      }
    );
    const addressData = result.data.documents[0];
    if (addressData.road_address === null) {
      setAddress(
        `${addressData.address.region_1depth_name} ${addressData.address.region_2depth_name} ${addressData.address.region_3depth_name}`
      );
    } else {
      setAddress(`${addressData.road_address.building_name}`);
    }
  }
  useEffect(() => {
    getLocalInfo();
  }, []);
  return (
    <div className="flex flex-col items-center gap-y-4">
      <InfoBar title={address}></InfoBar>
      <div className="relative flex items-center justify-center w-full h-4 gap-x-2">
        <GirlListUser></GirlListUser>
        <p>{resultData?.totalUserCnt}</p>
        <GirlListImage></GirlListImage>
        <p>{resultData?.totalPhotoCnt}</p>
        <div
          onClick={() => setSelectOpen(!selectOpen)}
          className="absolute flex items-center w-20 p-2 right-2 gap-x-1"
        >
          <p>{sort === "like" ? "인기순" : "최신순"}</p>
          <CaretDown className="stroke-black dark:stroke-white"></CaretDown>
        </div>
        {selectOpen && (
          <ul className="absolute z-10 w-20 p-2 bg-white border-2 rounded-lg right-2 top-6">
            <li
              onClick={() => {
                setSort("like");
                setSelectOpen(!selectOpen);
              }}
              className="mb-1"
            >
              인기순
            </li>
            <hr></hr>
            <li
              onClick={() => {
                setSort("date");
                setSelectOpen(!selectOpen);
              }}
              className="mt-1"
            >
              최신순
            </li>
          </ul>
        )}
      </div>
      <Map
        center={{ lat: latitude, lng: longitude }}
        style={{ width: "100vw", height: "40vh" }}
        level={2}
        zoomable={false}
        draggable={false}
        disableDoubleClick={true}
      >
        {resultData !== undefined && (
          <>
            {resultData.photoList.map((photo) => {
              return (
                <CustomOverlayMap
                  key={photo.photoId}
                  position={{ lat: photo.mapLatitude, lng: photo.mapLongitude }}
                >
                  <div
                    onClick={() =>
                      router.push(`/girl-home/list/${photo.photoId}`)
                    }
                    className="w-4 h-4 rounded-full"
                    style={{
                      background:
                        "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)",
                    }}
                  ></div>
                </CustomOverlayMap>
              );
            })}
          </>
        )}
      </Map>
      <div
        className="flex justify-center items-center"
        style={{ height: "40vh" }}
      >
        {resultData !== undefined && (
          <>
            {!resultData.page.is_first && (
              <LeftIcon
                onClick={() => dispatch(setPage(page - 1))}
                stroke={"black"}
              />
            )}
            <div className="flex h-full justify-center items-center">
              <div className="grid grid-cols-4 grid-rows-3 gap-1 px-1 h-fit">
                {resultData.photoList.map((photo) => {
                  return (
                    <div
                      key={photo.photoId}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <div
                        onClick={() =>
                          router.push(`/girl-home/list/${photo.photoId}`)
                        }
                        className="col-span-1 bg-cover"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundImage: `url(${photo.s3Url})`,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
            {!resultData.page.is_last && (
              <RightIcon
                onClick={() => dispatch(setPage(page + 1))}
                width={"24px"}
                height={"24px"}
                stroke={"black"}
              />
            )}
          </>
        )}
      </div>
      <TabBar></TabBar>
    </div>
  );
}
