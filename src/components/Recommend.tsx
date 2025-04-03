"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from "./MovieCard";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

type MovieType = {
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
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { id } = useParams();
  const router = useRouter();

  const handleMovieClick = (movieId: string) => {
    router.push(`/details/${movieId}`);
  };

  const fetchRecommendMovies = async () => {
    const { data } = await axiosInstance.get(
      `/movie/${id}/similar?language=en-US&page=1`
    );
    setMovies(data.results);
  };

  useEffect(() => {
    fetchRecommendMovies();
  }, [id]);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-semibold">More like this</h2>
        <Button className="bg-transparent text-black border-none shadow-none">
          See more
          <ArrowRight />
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
        {movies.slice(0, 5).map((movie, index) => (
          <MovieCard
            key={index}
            isSmall
            className="!w-[190px] min-h-[372px]"
            onClick={() => handleMovieClick(movie.id)}
            title={movie.title}
            vote_average={movie.vote_average}
            poster_path={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};
