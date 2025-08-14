import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
export default function Header() {
  return (
    <header className="fixed z-10 top-0 w-full">
      <div className="flex justify-between items-center gap-4 w-full px-8 lg:px-32 py-4 bg-[rgba(24,6,185,0.8)]">
        <div className="flex justify-center gap-2 items-center">
          <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-2">
            <Link href={"/"}>
              <Image
                src={"/assets/Logo.webp"}
                width={158}
                height={46}
                alt="Logo"
              />
            </Link>

            <div className="h-10 w-0.5 bg-background hidden lg:flex" />
            <Separator className="flex lg:hidden"/>
            <div className="flex flex-col h-full justify-center gap-2 items-start text-background">
              <p className="text-sm font-semibold">
                सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय
              </p>
              <p className="text-sm font-semibold">
                Ministry of Micro, Small & Medium Enterprises
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-end items-center">
          <div className="flex flex-col justify-center items-end gap-1 text-xs">
            <div>
              <Avatar>
                <AvatarFallback>
                  <p>NC</p>
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex justify-center items-center gap-1 text-white">
              <p>Clone by</p>

              <div className="h-4 w-[1px] bg-white/70" />

              <a
                href="mailto:nkca122@gmail.com"
                className="font-bold underline"
              >
                Nikunj Chauhan
              </a>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </header>
  );
}
