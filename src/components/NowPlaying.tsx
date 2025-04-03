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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

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

export const Nowplaying = () => {
  const [nowPlayingMovieData, setNowPlayingMovieData] = useState<MovieTypes[]>(
    []
  );

  const fetchNowPlayingMovies = async () => {
    const { data } = await axiosInstance.get("/movie/now_playing");
    setNowPlayingMovieData(data.results);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="relative w-screen">
      <Carousel>
        <CarouselContent>
          {nowPlayingMovieData?.slice(0, 3).map((item, index) => (
            <CarouselItem key={index} className="relative w-screen p-0">
              <div className="relative w-screen h-[800px]">
                {/* Description */}
                <div className="flex flex-col gap-4 w-[404px] absolute z-40 left-[140px] top-1/2 -translate-y-1/2">
                  <div>
                    <div className="flex flex-col">
                      <p className="text-white text-[16px] font-normal">
                        Now Playing:
                      </p>
                      <p className="text-white text-[36px] font-bold">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-amber-400 size-[28px] fill-amber-400" />
                      <p className="text-white text-[18px] font-semibold">
                        {item.vote_average}
                        <span className="text-[#71717A] text-[16px] font-normal">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="w-[302px] text-white text-[12px] line-clamp-3">
                    {item.overview}
                  </p>
                  <Button className="bg-white text-black text-[14px] font-medium flex items-center gap-2 border py-2 w-fit">
                    <PlayIcon />
                    Watch trailer
                  </Button>
                </div>
                {/* Description end */}

                <Image
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={`${item.title} Poster`}
                  fill
                  className="object-cover brightness-50"
                />
              </div>

              <div className="flex gap-[8px] justify-center absolute bottom-[37px] left-1/2 -translate-x-1/2">
                {[0, 1, 2].map((dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`size-[8px] rounded-full ${
                      index === dotIndex ? "bg-gray-400" : "bg-white"
                    }`}
                  ></div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-black/30 transition" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full z-10 hover:bg-black/30 transition" />
      </Carousel>
    </div>
  );
};
