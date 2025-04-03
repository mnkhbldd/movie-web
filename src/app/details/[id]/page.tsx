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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  genres: { id: number; name: string }[];
  runtime: number;
};

type TrailerType = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

function Detail() {
  const params = useParams();
  const router = useRouter();

  const [movie, setMovie] = useState<MovieType | null>(null);
  const [trailers, setTrailers] = useState<TrailerType[]>([]);

  const runtime = movie?.runtime ?? 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axiosInstance.get(
          `movie/${params.id}?language=en-US`
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    const fetchTrailers = async () => {
      try {
        const { data } = await axiosInstance.get(
          `movie/${params.id}/videos?language=en-US`
        );
        setTrailers(data.results || []);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };

    fetchMovie();
    fetchTrailers();
  }, [params.id]);

  return (
    <div className="w-screen flex flex-col items-center py-[52px]">
      <div className="flex flex-col gap-[32px] w-[1080px]">
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <p className="text-[36px] text-black font-bold">{movie?.title}</p>
            <p className="text-[18px] text-black font-normal">
              {movie?.release_date} PG {hours}h {minutes}m
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#09090B]">Rating</p>
            <div className="flex gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <p className="text-black font-bold text-[14px]">
                {movie?.vote_average}
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
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt="Upcoming Movie Poster"
            width={290}
            height={428}
            className="!static rounded-[8px] !h-[428px]"
          />

          <div className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
              alt="Upcoming Movie Backdrop"
              width={760}
              height={428}
              className="!static rounded-[8px] !h-[428px]"
            />
            <div className="flex gap-3 absolute bottom-[24px] left-[24px] items-center">
              <Dialog>
                <DialogTrigger className="bg-white px-2 py-2 rounded-full">
                  <PlayIcon />
                </DialogTrigger>
                <DialogContent className="!w-[993px] !max-w-6xl h-auto !p-0 !pt-10">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      <iframe
                        width="100%"
                        height="561"
                        src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
                        title="YouTube video player"
                        style={{ borderRadius: 8 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <p className="text-[16px] text-white">Play trailer</p>
              <p className="text-[14px] text-white">2:35</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex gap-3">
            {movie?.genres.map((genre, index) => (
              <Badge
                className="text-black bg-white border border-black"
                key={index}
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <p>{movie?.overview}</p>
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
