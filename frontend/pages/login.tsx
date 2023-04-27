import Link from "next/link";
import Slider from "react-slick"
import styles from "@/styles/login.module.scss"

export default function Login() {
    const authBaseURL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const oauthURL = authBaseURL+ "oauth2/authorization/kakao?redirect_uri=" + redirectURI;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(
        <div className="h-screen">
            <div className="flex flex-col items-center justify-center h-full gap-y-4">
                <p className={`text-6xl text-center ${styles.title}`}>SOME</p>
                <p>함께 만들어가는 앨범</p>
                <div className="my-4" style={{maxWidth: "100vw", width: "100vw"}}>
                    <Slider {...settings} >
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <img src="/images/onboarding1.PNG" style={{width:"200px"}} alt="" />
                            </div>
                            <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
                            <p className="text-center">소중한 사람과 소중한 순간을 남기세요</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <img src="/images/onboarding1.PNG" style={{width:"200px"}} alt="" />
                            </div>
                            <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
                            <p className="text-center">소중한 사람과 소중한 순간을 남기세요</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <img src="/images/onboarding1.PNG" style={{width:"200px"}} alt="" />
                            </div>
                            <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
                            <p className="text-center">소중한 사람과 소중한 순간을 남기세요</p>
                        </div>
                        <div>
                            <div className="flex flex-col mb-4 gap-y-4">
                                <div className="flex items-center justify-center">
                                    <img src="/images/onboarding1.PNG" style={{width:"200px"}} alt="" />
                                </div>
                                <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
                                <p className="text-center">소중한 사람과 소중한 순간을 남기세요</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <img src="/images/onboarding1.PNG" style={{width:"200px"}} alt="" />
                            </div>
                            <p className="text-xl text-center">"남는건 사진이야 친구야"</p>
                            <p className="text-center">소중한 사람과 소중한 순간을 남기세요</p>
                        </div>
                    </Slider>
                </div>
                <Link href={oauthURL}>
                    <img className="mt-4" src="/images/kakao_login_medium_wide.png" alt="" />
                </Link>
            </div>
        </div>
    )    
};
