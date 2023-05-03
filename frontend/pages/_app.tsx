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
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // React-Query 옵션 설정
    },
  },
});

function App({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={client}>
            <Component {...props.pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
