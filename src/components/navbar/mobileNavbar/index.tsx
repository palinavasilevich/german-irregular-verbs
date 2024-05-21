import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Navbar, { links } from "..";
import Logo from "@/components/logo";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-y-6">
            <Logo />
            <nav className="flex flex-col items-center gap-y-6">
              {links.map((link) => (
                <SheetClose asChild key={link.title}>
                  <Link href={link.path} className="capitalize text-2xl">
                    {link.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
