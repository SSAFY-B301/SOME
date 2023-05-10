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
