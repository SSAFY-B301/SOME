import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import wrapper from "@/store/configureStore";

// React-Query
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { useEffect } from "react";
import Script from "next/script";
import * as gtag from "../lib/gtag";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      // React-Query 옵션 설정
    },
  },
});
function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
    const htmlTag = window.document.querySelector("html");
    if (htmlTag) {
      // 앞서 사용한 prefers-color-scheme 값을 확인 해 시스템의 컬러모드 초기값으로 사용
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        htmlTag.className = "dark";
        htmlTag.style.colorScheme = "dark";
      }
      console.log("MODE", htmlTag.className);

      // css media query 동작과 유사하게, 시스템의 컬러모드가 변경될 때 마다 이를 웹에 반영
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQueryList.addEventListener("change", (e) => {
        if (e.matches) {
          htmlTag.className = "dark";
          htmlTag.style.colorScheme = "dark";
        } else {
          htmlTag.className = "light";
          htmlTag.style.colorScheme = "light";
        }
      });
    }
  }, []);
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Component {...props.pageProps} />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
