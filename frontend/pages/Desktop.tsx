import IosIcon from "public/icons/ios.svg";
import AndroidIcon from "public/icons/android.svg";

function Desktop() {
  const android = "안드로이드  크롬 -> 링크 열기 -> 메뉴 -> 홈 화면에 추가";
  const ios = "iOS  Safari ->  공유하기 -> 홈 화면에 추가";
  return (
    <>
      <section
        className="bg-white flex flex-col justify-center items-center gap-4"
        style={{ width: "100vw", height: "100vh" }}
      >
        <img
          src="images/SOME.png"
          alt=""
          style={{ width: "30vw", height: "30vw" }}
        />
        <div className="flex flex-col justify-center items-center gap-1">
          <span className="text-xl font-bold">QR로 들어와주세요.</span>
          <div className="flex  justify-center items-center gap-2">
            <AndroidIcon />
            <span className="text-xl font-bold">{android}</span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <IosIcon />
            <span className="text-xl font-bold">{ios}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Desktop;
