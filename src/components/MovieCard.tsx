import { Star } from "lucide-react";
import Image from "next/image";

export const MovieCard = ({
  title,
  vote_average,
  poster_path,
  onClick,
  className,
  isSmall,
}: {
  title: string;
  vote_average: number;
  poster_path: string | null;
  onClick: () => void;
  className: string;
  isSmall: boolean;
}) => {
  return (
    <div
      className={
        `flex flex-col w-[230px] min-h-[439px] h-fit bg-gray-200 rounded-[8px] cursor-pointer ` +
        className
      }
      onClick={onClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={` UpcomingImage  `}
        width={229.75}
        height={340}
        className=" !static rounded-t-[8px] !h-[340px]"
      />
      <div className="p-2">
        <div className="flex gap-1 items-center">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <p className="text-black font-bold text-[14px]">
            {vote_average}
            <span className="text-[#71717A] text-[12px] font-normal">/10</span>
          </p>
        </div>
        {isSmall ? (
          <p className="text-[18px]">
            {title.length > 43 ? title.slice(0, 33) + "..." : title}
          </p>
        ) : (
          <p className="text-[18px]">
            {title.length > 43 ? title.slice(0, 40) + "..." : title}
          </p>
        )}
      </div>
    </div>
  );
};
