"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";
import { useParams, useRouter } from "next/navigation";

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

export const Recommend = () => {
  const [nowPlayingMovieData, setNowPlayingMovieData] = useState<MovieTypes[]>(
    []
  );
  const params = useParams();

  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setNowPlayingMovieData(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // console.log(nowPlayingMovieData, "recommend");w

  return (
    <div className="w-full flex flex-col gap-[32px] ">
      <div className="flex justify-between w-full">
        <p className="text-[24px] font-semibold">More like this</p>
        <Button className="bg-transparent text-black border-none shadow-none">
          See more
          <ArrowRight />
        </Button>
      </div>

      <div className="flex flex-wrap gap-[32px] ">
        {nowPlayingMovieData.slice(0, 5).map((value, index) => (
          <MovieCard
            isSmall={true}
            className="!w-[190px] min-h-[372px]   "
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
