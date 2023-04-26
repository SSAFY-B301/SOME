interface PhotoType {
  width: string;
  height: string;
  img: string;
}

/**
 * 사진 컴포넌트
 * @param width: string
 * @param height: string
 * @param img: string
 * @returns
 */
function Photo(props: PhotoType) {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: "url(" + props.img + ")",
      }}
    ></div>
  );
}

export default Photo;
