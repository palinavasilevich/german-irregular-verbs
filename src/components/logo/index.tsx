import Image from "next/image";
import Link from "next/link";

import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src="/logo.png" alt="logo_img" fill />
        </div>
        <span className={styles.text}>mighty verbs</span>
      </div>
    </Link>
  );
};

export default Logo;
