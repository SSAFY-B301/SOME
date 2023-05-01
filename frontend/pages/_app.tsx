import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import wrapper from "@/store/configureStore";

// React-Query
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.scss";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // React-Query 옵션 설정
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
