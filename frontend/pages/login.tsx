import Link from "next/link";


export default function Login() {
    return(
        <div>
            <div className="flex flex-col items-center h-full gap-y-4">
                <p className="text-5xl text-center">SOME</p>
                <p>함께 만들어가는 앨범</p>
                <img src="/images/onboarding1.PNG" className="rounded-3xl" style={{width : 240}} alt="" />
                <Link href={"/"}><img src="/images/kakao_login_medium_narrow.png" alt="" /></Link>
            </div>
        </div>
    )
    
};
