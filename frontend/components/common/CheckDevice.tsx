import { useDispatch } from "react-redux";
import { setUserAgent } from "@/features/userAgentSlice";
import { useEffect } from "react";
import { userAgent } from "next/server";
import { useRouter } from "next/router";

export const CheckDevice = () => {
  let dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if ("userAgent" in navigator) {
      const info = navigator.userAgent;
      const isIos = /iPhone|iPad|iPod/i.test(info);
      const isAndroid = /Android/i.test(info);
      const isDesktop = /Windows|Intel Mac OS/i.test(info);
      let userAgent;
      if (isIos) {
        userAgent = "Ios";
      } else if (isAndroid) {
        userAgent = "Android";
      } else {
        userAgent = "Desktop";
      }
      dispatch(setUserAgent(userAgent));

      if (userAgent === "Desktop") {
        router.push("Desktop");
      }
    }
  }, []);
  return userAgent;
};
