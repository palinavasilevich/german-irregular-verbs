import Image from "next/image";
import Link from "next/link";

import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/logo.svg"
            alt="logo_img"
            fill
            loading="eager"
            priority={true}
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
