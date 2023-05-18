import Link from "next/link";
import styles from "styles/home.module.scss";
import LogoText from "public/icons/Logo.svg";

function Logo() {
  return (
    <Link href="/boy-home">
      <LogoText width={"80px"} height={"36px"} />
    </Link>
  );
}

export default Logo;
