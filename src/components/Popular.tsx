"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

type MovieTypes = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
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

export const Popular = () => {
  const [nowPlayingMovieData, setNowPlayingMovieData] = useState<MovieTypes[]>(
    []
  );

  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleOnclick2 = (movieType: string) => {
    router.push(`/similiar/${movieType}`);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setNowPlayingMovieData(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="w-full flex flex-col gap-[32px] px-[80px] max-lg:px-[20px]">
      <div className="flex justify-between w-full">
        <p className="text-[24px] font-semibold">Popular</p>
        <Button
          onClick={() => handleOnclick2("popular")}
          className="bg-transparent text-black border-none shadow-none"
        >
          See more
          <ArrowRight />
        </Button>
      </div>

      <div className="flex flex-wrap gap-[32px] max-lg:gap-5">
        {" "}
        {nowPlayingMovieData.slice(0, 10).map((value, index) => (
          <MovieCard
            isSmall={false}
            className="max-lg:w-[185px] max-lg:h-[309px]"
            onClick={() => handleOnclick(value.id)}
            key={index}
            title={value.title}
            vote_average={value.vote_average}
            poster_path={value.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
