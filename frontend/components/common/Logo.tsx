import Link from "next/link";
import styles from "styles/home.module.scss";

function Logo() {
  return (
    <Link href="/photo/1">
      <h1 className={`text-3xl ${styles.logo}`}>SOME</h1>
    </Link>
  )
}

export default Logo;
