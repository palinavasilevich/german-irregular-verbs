import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  {
    title: "home",
    path: "/",
  },
  {
    title: "verbs",
    path: "/verbs",
  },

  {
    title: "Learn random verbs",
    path: "/learn-random-verbs",
  },
];

const Navbar = ({
  containerStyles,
  linkStyles,
  underlineStyles,
}: {
  containerStyles?: string;
  linkStyles?: string;
  underlineStyles?: string;
}) => {
  const path = usePathname();

  return (
    <nav className={cn(" ", containerStyles)}>
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.title}
          className={cn("capitalize", linkStyles)}
        >
          {link.path === path && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ type: "tween" }}
              layoutId="underline"
              className={underlineStyles}
            />
          )}
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
