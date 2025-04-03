"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

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

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleOnclick2 = (movieType: string) => {
    router.push(`/similiar/${movieType}`);
  };

  const fetchpopularMovieData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/movie/popular");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setNowPlayingMovieData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchpopularMovieData();
  }, []);

  return (
    <div className="flex items-start">
      {!isLoading && nowPlayingMovieData.length > 0 ? (
        <div className="w-full flex flex-col gap-[32px] px-[80px] max-lg:px-[20px]">
          <div className="flex justify-between w-full">
            <p className="text-[24px] font-semibold">Upcoming</p>
            <Button
              className="bg-transparent text-black border-none shadow-none"
              onClick={() => handleOnclick2("upcoming")}
            >
              See more
              <ArrowRight />
            </Button>
          </div>

          <div className="flex flex-wrap gap-[32px] max-lg:gap-5">
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
      ) : (
        <div className="w-full flex flex-col gap-[32px] px-[80px] max-lg:px-[20px]">
          <div className="flex justify-between w-full">
            <Skeleton className="w-[250px] h-[32px]  bg-gray-400"></Skeleton>
            <Skeleton className="w-[165px] h-[36px]  bg-gray-400"></Skeleton>
          </div>

          <div className="flex flex-wrap gap-[32px] max-lg:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
              <Skeleton
                key={index}
                className="w-[230px] h-[439px] bg-gray-400"
              ></Skeleton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
