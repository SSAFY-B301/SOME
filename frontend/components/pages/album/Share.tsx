interface propsType {
  files: FileList;
}
interface dataType {
  files: File[];
}

export const share = async (props: propsType) => {
  const files: File[] = Array.from(props.files);
  const shareData: dataType = {
    files: files,
  };
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
};

interface urlPropsType {
  url: string;
}

export const urlToFile = async (props: urlPropsType) => {
  const response = await fetch(props.url);
  const data = await response.blob();
  const ext = props.url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = props.url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};
