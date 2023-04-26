import Link from "next/link"
import { useEffect, useState } from "react"

export default function Kakao() {
    //로그인 완료 페이지니까 리덕스에 state 저장해주고 이동할 수 있도록
    return(
        <div>
            로그인 완료
            <Link href="/">
                <button>홈으로</button>
            </Link>
        </div>
    )
};
