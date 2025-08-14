import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { House } from "lucide-react";
export default function Submitted() {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
        <div className="flex-1/2 bg-red-100 border-2 border-red-500 p-6 rounded-2xl">
          <h6 className="text-4xl font-bold text-red-500">Done !!!</h6>
          <Image
            src={"/icons/response.png"}
            width={708}
            height={521}
            alt="Loading..."
          />
        </div>

        <div className="flex-1/2 flex flex-col justify-center gap-2 items-start">
          <p className="text-4xl font-semibold">
            We’ve successfully processed your response.
          </p>
          <Separator />
          <Link
            href={"/"}
            className="flex flex-wrap justify-center items-center gap-2 text-md font-semibold hover:underline text-blue-600 text-sm"
          >
            Return to <House size={16}/>
          </Link>
        </div>
      </div>
    </>
  );
}
