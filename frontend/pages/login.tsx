import Link from "next/link";

export default function Login() {
    const authBaseURL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const oauthURL = authBaseURL+ "oauth2/authorization/kakao?redirect_uri=" + redirectURI;

    return(
        <div>
            <div className="flex flex-col items-center h-full gap-y-4">
                <p className="text-5xl text-center">SOME</p>
                <p>함께 만들어가는 앨범</p>
                <img src="/images/onboarding1.PNG" className="rounded-3xl" style={{width : 240}} alt="" />
                <Link href={oauthURL}>
                    <button className="w-56 rounded-md">로그인</button>
                </Link>
            </div>
        </div>
    )    
};
