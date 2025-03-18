import { ChevronRight, PlayIcon, Star } from "lucide-react";
import { Button } from "./ui/button";

export const Features = () => {
  return (
    <div className="flex items-center justify-center w-full h-[1100px] bg-[url(https://s3-alpha-sig.figma.com/img/c78e/5e57/16d36abbdaa8df480db189d5729e384a?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mLG2xOJZNT2vGCrvhDwo3-iKl0QLHOJCxUbykqD81OWYT61RDmWH~sY5qc4qVMmDHRoLdT3VXAnqpxjl4QRY7lvqwtvVTj2-RScRPADrSRE2X1dKJ6MNwI89GQsAr7CVA~Sw886s4cN3GzZCxbhX6nG5wCcsdExQ3ZifH-DrPK1y2qNpWDmJzamRmYUQB4G5gKUvdNeqjPEES5nuyWmp4tVWbJDWV1Ve6DECdtwn6WwE~0puD445Fe7qQpsvTO15bYmHP3E7sN6ZamI~BBe1H7Aisb1JjhHE35MH~r0CHClF6Ayy8aDTsnbuKYmE-rzkB3IlXZLoaZaJNRHFDc~Erg__)] bg-cover bg-no-repeat">
      {/* Description */}
      <div className="flex flex-col gap-4 w-[404px] absolute left-[140px]">
        <div className="">
          <div className="flex flex-col">
            <p className="text-white text-[16px] font-normal">Now Playing:</p>
            <p className="text-white text-[36px] font-bold">Wicked</p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-amber-400 size-[28px] fill-amber-400" />
            <p className="text-white text-[18px] font-semibold">
              6.9
              <span className="text-[#71717A] text-[16px] font-normal">
                /10
              </span>
            </p>
          </div>
        </div>
        <p className="w-[302px] text-white text-[12px]">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.{" "}
        </p>
        <Button className="bg-white text-black text-[14px] font-medium flex items-center gap-2 border py-2 w-fit">
          <PlayIcon />
          Watch trailer
        </Button>
      </div>
      {/* Description end  */}
      {/* Left button */}
      <Button className="bg-white rounded-full size-[40px] absolute right-[44px]">
        <ChevronRight className="text-black" />
      </Button>
    </div>
  );
};
