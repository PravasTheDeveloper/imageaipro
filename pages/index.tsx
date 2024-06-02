import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="w-full h-auto">
        <div className="w-full h-screen">
          <div className="relative h-full w-full bg-white">
            <div className="absolute z-20 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">

            </div>
            <div className="w-full text-black h-full flex justify-center items-center z-50 absolute">
              <div className="w-full h-[60vh] flex md:flex-row flex-col justify-center items-center">
                <div className="h-full flex items-start mt-10">
                  <h1 className="text-6xl font-bold mr-4">Image</h1>
                </div>
                <div className="auto h-full flex flex-col items-center my-10 md:my-0">
                  <Image src={"/homepageimage/background.jpg"} width={500} height={400} className="z-50 h-[90%] w-auto rounded-3xl" alt="hello" />
                  <Link href={"/dashboard"} className="mt-10"><Button>Continue<FaArrowRightLong className="ml-4" /></Button></Link>
                </div>

                <div className="h-full flex items-end mb-36">
                  <h1 className="text-6xl font-bold ml-4">AI Pro</h1>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
