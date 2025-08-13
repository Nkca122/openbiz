import { Separator } from "./ui/separator";
import { Copyright, Twitter, Facebook, Instagram } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
export default function Footer() {
  return (
    <>
      <footer
        className="bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/footer_bg.svg)",
        }}
      >
        <div className="px-8 lg:px-32 py-16 flex flex-col justify-center items-center gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-center items-start gap-4 w-full">
                <h1 className="text-background font-bold">
                  UDYAM Registration
                </h1>
                <div>
                  <p className="text-xs leading-none text-background">
                    Ministry of MSME <br />
                    Udyog bhawan - New Delhi
                  </p>
                </div>
                <div>
                  <p className="text-xs leading-none text-background">
                    <b>Email: </b>champions@gov.in
                  </p>
                </div>
                <div>
                  <div>
                    <p className="text-xs leading-none text-background">
                      <b>
                        Contact Us <br />
                        For Grievances/Problems
                      </b>
                    </p>
                  </div>
                </div>
                <Separator className="flex lg:hidden" />
              </div>

              <Separator orientation="vertical" className="hidden lg:flex" />
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex flex-col justify-center items-start gap-4 w-full">
                <h1 className="text-background font-bold text-sm">
                  Our Services
                </h1>
                <ul className="[list-style-type:'>'] mx-6 flex flex-col gap-2">
                  <li className="text-xs text-background before:mx-2">
                    Champions
                  </li>
                  <li className="text-xs text-background before:mx-2">
                    MSME Samadhan
                  </li>
                  <li className="text-xs text-background before:mx-2">
                    MSME Sambandh
                  </li>
                  <li className="text-xs text-background before:mx-2">
                    MSME Dashboard
                  </li>
                  <li className="text-xs text-background before:mx-2">
                    Entrepreneurship Skill Development Programme (ESDP)
                  </li>
                </ul>
                <Separator className="flex lg:hidden" />
              </div>

              <Separator orientation="vertical" className="hidden lg:flex" />
            </div>
            <div className="flex justify-start lg:justify-center items-center w-full">
              <div className="flex flex-col justify-center items-start gap-1 w-full">
                <p className="text-xs font-bold text-background">Video</p>
                <video
                  src="/assets/udyam.mp4"
                  controls
                  preload="auto"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
            <div className="flex-3/4 flex justify-start gap-2 items-start">
              <div className="flex justify-center items-start gap-2">
                <div>
                  <Copyright color="white" />
                </div>

                <p className="text-background text-xs">
                  Copyright <b>Udyam Registration</b>. All Rights Reserved,{" "}
                  <b>
                    Website Content Managed by Ministry of Micro Small and
                    Medium Enterprises, GoI
                  </b>{" "}
                  Website hosted & managed by National Informatics Centre,{" "}
                  <b>Ministry of Communications and IT, Government of India</b>
                </p>
              </div>
            </div>

            <div className="flex-1/4 flex justify-end items-center gap-2">
              <div className="h-8 w-8 rounded-full border-2 border-white flex justify-center items-center p-1 text-background bg-[#78787880]">
                <Twitter />
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-white flex justify-center items-center p-1 text-background bg-[#78787880]">
                <Facebook />
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-white flex justify-center items-center p-1 text-background bg-[#78787880]">
                <Instagram />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
