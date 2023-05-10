import Link from "next/link";
import Slider from "react-slick";
import styles from "@/styles/login.module.scss";
import { transform } from "typescript";

export default function Login() {
  const kakaoAuthURL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY;
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const oauthURL =
    kakaoAuthURL +
    "/oauth/authorize?response_type=code&client_id=" +
    kakaoKey +
    "&redirect_uri=" +
    redirectURI +
    "&scope=account_email,profile_image,profile_nickname,friends";
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };
  // return (
  //   <div className="h-screen">
  //     <div className="flex flex-col items-center justify-center h-full gap-y-4">
  //       <p className={`text-6xl text-center ${styles.title}`}>SOME</p>
  //       <p>함께 만들어가는 앨범</p>
  //       <div className="my-4" style={{ maxWidth: "100vw", width: "100vw" }}>
  //         <Slider {...settings}>
  //           <div>
  //             <div className="flex items-center justify-center mb-4">
  //               <img
  //                 src="/images/onboarding1.PNG"
  //                 style={{ width: "200px" }}
  //                 alt=""
  //               />
  //             </div>
  //             <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
  //             <p className="text-center">
  //               소중한 사람과 소중한 순간을 남기세요
  //             </p>
  //           </div>
  //           <div>
  //             <div className="flex items-center justify-center mb-4">
  //               <img
  //                 src="/images/onboarding2.PNG"
  //                 style={{ width: "200px" }}
  //                 alt=""
  //               />
  //             </div>
  //             <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
  //             <p className="text-center">
  //               소중한 사람과 소중한 순간을 남기세요
  //             </p>
  //           </div>
  //           <div>
  //             <div className="flex items-center justify-center mb-4">
  //               <img
  //                 src="/images/onboarding1.PNG"
  //                 style={{ width: "200px" }}
  //                 alt=""
  //               />
  //             </div>
  //             <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
  //             <p className="text-center">
  //               소중한 사람과 소중한 순간을 남기세요
  //             </p>
  //           </div>
  //           <div>
  //             <div className="flex flex-col mb-4 gap-y-4">
  //               <div className="flex items-center justify-center">
  //                 <img
  //                   src="/images/onboarding1.PNG"
  //                   style={{ width: "200px" }}
  //                   alt=""
  //                 />
  //               </div>
  //               <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
  //               <p className="text-center">
  //                 소중한 사람과 소중한 순간을 남기세요
  //               </p>
  //             </div>
  //           </div>
  //           <div>
  //             <div className="flex items-center justify-center mb-4">
  //               <img
  //                 src="/images/onboarding1.PNG"
  //                 style={{ width: "200px" }}
  //                 alt=""
  //               />
  //             </div>
  //             <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
  //             <p className="text-center">
  //               소중한 사람과 소중한 순간을 남기세요
  //             </p>
  //           </div>
  //         </Slider>
  //       </div>
  //       <Link href={oauthURL}>
  //         <img
  //           className="mt-4"
  //           src="/images/kakao_login_medium_wide.png"
  //           alt=""
  //         />
  //       </Link>
  //     </div>
  //   </div>
  // );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-screen h-screen">
      <Slider {...settings} className={`${styles.slider}`}>
        <div className="w-screen h-screen">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <p className={`text-6xl text-center ${styles.title}`}>SOME</p>
              <p>함께 만들어가는 앨범</p>
            </div>
          </div>
        </div>
        <div className="relative w-screen h-screen">
          <div className="absolute" style={{ right: "5vw", top: "10vh" }}>
            <p className={`text-4xl text-end ${styles.title}`}>
              남는건 사진이야
            </p>
            <p className={`text-4xl text-end mb-4 ${styles.title}`}>친구야</p>
            <p className="text-end">남사친, 추억을 담다</p>
          </div>
          <div
            className="absolute"
            style={{
              left: "50vw",
              top: "30vh",
              transform: "translate(-50%, 0px)",
            }}
          >
            <img
              src="/images/onboarding1.PNG"
              style={{ width: "200px" }}
              alt=""
            />
          </div>
        </div>
        <div className="relative w-screen h-screen">
          <div className="absolute" style={{ right: "5vw", top: "10vh" }}>
            <p className={`text-4xl text-end ${styles.title}`}>
              남는건 사진이야
            </p>
            <p className={`text-4xl text-end mb-4 ${styles.title}`}>친구야</p>
          </div>
          <div
            className="absolute flex justify-between items-center"
            style={{
              width: "90vw",
              height: "50vh",
              left: "50%",
              top: "25vh",
              transform: "translate(-50%)",
            }}
          >
            <div>
              <img
                src="/images/onboarding1.PNG"
                style={{ width: "180px" }}
                alt=""
              />
            </div>
            <div
              className="h-4/6 flex flex-col justify-between box-border pl-2"
              style={{ width: "50%" }}
            >
              <span className="text-start">최근 소식 및 업로드 확인</span>
              <span className="text-start">자주찾는 앨범 설정</span>
              <span className="text-start">+ 버튼으로 빠른 앨범 생성</span>
            </div>
          </div>
        </div>
        <div className="relative w-screen h-screen">
          <div className="absolute" style={{ right: "5vw", top: "10vh" }}>
            <p className={`text-4xl text-end ${styles.title}`}>
              여기서 사진찍자
            </p>
            <p className={`text-4xl text-end mb-4 ${styles.title}`}>친구야</p>
            <p className="text-end">여사친, 세상 모든 곳의 포토존</p>
          </div>
          <div
            className="absolute"
            style={{
              left: "50vw",
              top: "30vh",
              transform: "translate(-50%, 0px)",
            }}
          >
            <img
              src="/images/onboarding2.PNG"
              style={{ width: "200px" }}
              alt=""
            />
          </div>
        </div>
        <div className="relative w-screen h-screen">
          <div className="absolute" style={{ right: "5vw", top: "10vh" }}>
            <p className={`text-4xl text-end ${styles.title}`}>
              여기서 사진찍자
            </p>
            <p className={`text-4xl text-end mb-4 ${styles.title}`}>친구야</p>
            <p className="text-end">여사친, 세상 모든 곳의 포토존</p>
          </div>
        </div>
      </Slider>
      <div
        className="absolute w-full flex justify-center items-center"
        style={{ bottom: "10vh" }}
      >
        <Link href={oauthURL} className="z-10">
          <div>
            <img src="/images/kakao_login_medium_wide.png" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
}
