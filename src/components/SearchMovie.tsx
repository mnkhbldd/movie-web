"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

type MovieTypes = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const SearchMovie = ({ inputValue }: { inputValue: string }) => {
  const [movieGenres, setmovieGenres] = useState<MovieTypes[]>([]);

  const router = useRouter();

  const handleOnclick = (id: number) => {
    router.push(`/details/${id}`);
    setmovieGenres([]);
  };

  useEffect(() => {
    if (inputValue.trim() === "") {
      setmovieGenres([]);
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setmovieGenres(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [inputValue]);

  return (
    <div className="w-fit h-fit ">
      {movieGenres.slice(0, 5).map((value, index) => (
        <div key={value.id}>
          <div className="w-[537px] p-2 rounded-[8px] flex gap-4 bg-white h-fit">
            <Image
              src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
              alt={` UpcomingImage  `}
              width={67}
              height={100}
              className=" !static rounded-t-[8px]"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <p className="text-[20px] font-semibold">{value.title}</p>
                <div className="flex gap-1">
                  <Star className="fill-amber-300 text-amber-300" />
                  <p className="text-[14px] font-medium text-black">
                    {value.vote_average}
                    <span className="text-[12px] font-normal text-[#71717A]">
                      /10
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-[14px] font-medium">{value.release_date}</p>
                <Button
                  className="bg-transparent shadow-none text-black border-none"
                  onClick={() => handleOnclick(value.id)}
                >
                  See more <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </div>
  );
};
