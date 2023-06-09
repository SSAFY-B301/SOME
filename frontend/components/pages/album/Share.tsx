import axios from "axios";

interface dataType {
  files: File[];
}
/**
 * 공유 기능
 * @param urls
 */
export const share = async (urls: string[]) => {
  const files = await Promise.all(urls.map((url) => urlToFile(url)));
  const shareData: dataType = {
    files: files,
  };
  try {
    await navigator.share(shareData);
  } catch (err) {}
};

/**
 * 링크 공유
 */
export const shareUrl = async () => {
  const shareData = {
    title: "SOME",
    text: "SOME 초대",
    url: "https://some-album.com/",
  };
  try {
    await navigator.share(shareData);
  } catch (err) {}
};

/**
 * 사진 URL을 File 객체로 반환
 * @param url
 * @returns
 */
export const urlToFile = async (url: string) => {
  const response = await axios({
    url: url,
    method: "GET",
    responseType: "blob",
  });

  const data = response.data;
  const ext = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${ext}` };
  const file = new File([data], filename!, metadata);
  return file;
};
