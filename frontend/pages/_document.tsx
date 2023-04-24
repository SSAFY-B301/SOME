import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <link rel="manifest" href="/manifest.json" />
      <link
        href="./../public/favicons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="./../public/favicons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        href="./../public/favicons/apple-icon-180x180.png"
      ></link>
      <body className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
