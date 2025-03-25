"use client";

import { MovieCard } from "@/components/MovieCard";
import { MovieCrew } from "@/components/MovieCrew";
import { Recommend } from "@/components/Recommend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ArrowRight, PlayIcon, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  genres: { id: number; name: string }[];
};

function Detail() {
  const params = useParams();

  const [Similiar, setSimiliar] = useState<MovieTypes | null>(null);

  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setSimiliar(res.data || null))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="flex flex-col gap-[32px] w-[1080px]">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="text-[36px] text-black font-bold">
              {Similiar?.title}
            </p>
            <p className="text-[18px] text-black font-normal">
              {Similiar?.release_date} PG 2h 40m
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#09090B]">Rating</p>
            <div className="flex gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <p className="text-black font-bold text-[14px]">
                {Similiar?.vote_average}
                <span className="text-[#71717A] text-[12px] font-normal">
                  /10
                </span>
              </p>
            </div>
            <p>37k</p>
          </div>
        </div>
        <div className="flex w-full gap-[32px]">
          <Image
            src={`https://image.tmdb.org/t/p/original${Similiar?.poster_path}`}
            alt={` UpcomingImage  `}
            width={290}
            height={428}
            className=" !static rounded-[8px] !h-[428px]"
          />

          <div className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${Similiar?.backdrop_path}`}
              alt={` UpcomingImage  `}
              width={760}
              height={428}
              className="!static rounded-[8px] !h-[428px]"
            />
            <div className="flex gap-3 absolute bottom-[24px] left-[24px] items-center ">
              <Button className="rounded-full bg-white">
                <PlayIcon className="text-black" />
              </Button>
              <p className="text-[16px] text-white">Play trailer</p>
              <p className="text-[14px] text-white">2:35</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex gap-3">
            {Similiar?.genres.map((value: any, index: number) => {
              return (
                <Badge
                  className="text-black bg-white border border-black"
                  key={index}
                >
                  {value.name}
                </Badge>
              );
            })}
          </div>
          <p>{Similiar?.overview}</p>
          <MovieCrew />
        </div>
        <div className="w-full flex flex-col gap-[32px] px-[80px] !p-0">
          <Recommend />
        </div>
      </div>
    </div>
  );
}

export default Detail;
