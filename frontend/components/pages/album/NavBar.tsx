import { useRouter } from "next/router";
import styles from "@/styles/album.module.scss";
import LeftIcon from "@/public/icons/CaretLeft.svg";

interface NavBarType {
  title: string;
}

function NavBar({ title }: NavBarType) {
  const router = useRouter();
  return (
    <section className={`${styles.NavBar}`}>
      <div className={`${styles.NavBarItems}`}>
        <p className="absolute w-screen h-full flex justify-center items-center text-xl">
          {title}
        </p>
        <div className="relative w-screen h-full flex justify-between items-center p-4">
          <LeftIcon onClick={() => router.back()} stroke="black" />
          <p className=" text-base">사진 선택</p>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
