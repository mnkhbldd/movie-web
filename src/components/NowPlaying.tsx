"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { PlayIcon, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

type Movie = {
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

export const Nowplaying = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/movie/now_playing");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="relative w-screen">
      <Carousel>
        {!isLoading && movies.length > 0 ? (
          <CarouselContent>
            {movies.slice(0, 3).map((movie, index) => (
              <CarouselItem key={index} className="relative w-screen p-0">
                <div className="relative w-full h-[800px]">
                  <div className="absolute z-40 left-[140px] top-1/2 transform -translate-y-1/2 gap-5 flex flex-col">
                    <div className="flex flex-col gap-4 w-[404px]">
                      <div className="flex flex-col">
                        <p className="text-white text-[16px] font-normal">
                          Now Playing:
                        </p>
                        <p className="text-white text-[36px] font-bold">
                          {movie.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="text-amber-400 size-[28px] fill-amber-400" />
                        <p className="text-white text-[18px] font-semibold">
                          {movie.vote_average}
                          <span className="text-[#71717A] text-[16px] font-normal">
                            /10
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="w-[302px] text-white text-[12px] line-clamp-3">
                      {movie.overview}
                    </p>
                    <Button className="bg-white text-black text-[14px] font-medium flex items-center gap-2 border py-2 w-fit ">
                      <PlayIcon />
                      Watch trailer
                    </Button>
                  </div>

                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    fill
                    className="object-cover brightness-50"
                  />

                  <div className="absolute bottom-[37px] left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`size-[8px] rounded-full ${
                          index === dotIndex ? "bg-gray-400" : "bg-white"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <Skeleton className="w-screen h-[800px] relative bg-gray-400" />
        )}

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-black/30 transition" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-black/30 transition" />
      </Carousel>
    </div>
  );
};
