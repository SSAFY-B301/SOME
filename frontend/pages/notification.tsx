// components
import { InfoBar } from "@/components/common/Nav";

// scss
import styles from "@/styles/notification.module.scss";
import { getAlarms } from "./api/notiApi";
import { NotiType } from "@/types/NotiType";
import { useEffect, useState } from "react";
import SnsNotiModal from "@/components/pages/notification/SnsModal";
import InviteModal from "@/components/pages/notification/InviteModal";
import AlarmTime from "@/components/pages/notification/AlarmTime";
import InfiniteScroll from "react-infinite-scroller";
import { CommonLoading } from "@/components/common/Loading";

interface SnsHandlerParamType {
  notiInfo: NotiType;
}
interface InviteHandlerParamType {
  albumId: number;
  notiId: number;
}

export default function Notification() {
  const { status, queryData, fetchNextPage, hasNextPage } = getAlarms();
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [snsModalOpen, setSnsModalOpen] = useState<boolean>(false);
  const [albumId, setAlbumId] = useState<number>();
  const [notiInfo, setNotiInfo] = useState<NotiType>();
  const [notiId, setNotiId] = useState<number>();

  const snsAlarmHandler = (params: SnsHandlerParamType) => {
    setNotiInfo(params.notiInfo);
    setSnsModalOpen(!snsModalOpen);
  };
  function inviteModalHandler(params: InviteHandlerParamType) {
    setAlbumId(params.albumId);
    setNotiId(params.notiId);
    setInviteModalOpen(!inviteModalOpen);
  }

  return (
    <div className="flex flex-col justify-start h-screen bg-white dark:bg-dark-bg-home ">
      <InfoBar title="알림"></InfoBar>
      <div className={styles.container}>
        <InfiniteScroll
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<></>}
          threshold={99999}
        >
          {queryData !== undefined &&
            queryData.pages.map((page: any) =>
              page.notiList.map((noti: NotiType) => {
                return (
                  <div
                    key={noti.noti_id}
                    onClick={
                      noti.type === "SNS"
                        ? () => snsAlarmHandler({ notiInfo: noti })
                        : () =>
                            inviteModalHandler({
                              albumId: noti.photo_or_album_id,
                              notiId: noti.noti_id,
                            })
                    }
                    className={
                      noti.status === "UNCHECKED"
                        ? `w-screen py-4 px-6 ${styles.on_read}`
                        : `w-screen py-4 px-6 shadow-sm`
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        {noti.type === "SNS" && (
                          <p className={"dark:text-gray-200"}>SNS 공유 요청</p>
                        )}
                        {noti.type === "INVITE" && (
                          <p className={"dark:text-gray-200"}>
                            새로운 앨범 초대
                          </p>
                        )}
                      </div>
                      <div className="flex items-end">
                        <AlarmTime time={noti.date}></AlarmTime>
                      </div>
                    </div>
                    <div
                      className={
                        "flex justify-between items-center mt-2 dark:text-gray-200"
                      }
                    >
                      <div className="flex items-center justify-center h-12">
                        <p className="text-sm">{noti.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
        </InfiniteScroll>
      </div>
      {inviteModalOpen && (
        <InviteModal
          notiId={notiId}
          albumId={albumId}
          inviteModalOpen={inviteModalOpen}
          setInviteModalOpen={setInviteModalOpen}
        ></InviteModal>
      )}
      {snsModalOpen && (
        <SnsNotiModal
          notiInfo={notiInfo}
          snsModalOpen={snsModalOpen}
          setSnsModalOpen={setSnsModalOpen}
        ></SnsNotiModal>
      )}
    </div>
  );
}
