"use client";

import { MovieCard } from "@/components/MovieCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ArrowRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

type MovieGenreType = {
  id: number;
  name: string;
};

function Genres() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieGenres, setMovieGenres] = useState<MovieGenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${selectedGenres.join(
          ","
        )}&page=${pageNumber}&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setMovies(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [selectedGenres, pageNumber]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setMovieGenres(res.data.genres || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const handleBadgeClick = (genreId: number) => {
    const isSelected = selectedGenres.includes(genreId);
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
    router.push(
      `/genres?genres=${selectedGenres.join(",")}&page=${pageNumber}`
    );
  };

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex gap-[32px] flex-col px-24">
      <p className="text-[30px] font-semibold text-black">Search filter</p>
      <div className="flex items-start">
        <div>
          <div className="w-[387px] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[24px] font-semibold text-black">Genres</p>
              <p className="text-[16px] text-black font-normal">
                See lists of movies by genre
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {movieGenres.map((value) => (
                <Badge
                  onClick={() => handleBadgeClick(value.id)}
                  key={value.id}
                  variant="outline"
                  className={
                    selectedGenres.includes(value.id)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                >
                  {value.name}{" "}
                  {selectedGenres.includes(value.id) ? <X /> : <ArrowRight />}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen w-[32px]  px-10"></div>
        <div>
          {" "}
          <p className="text-[24px] font-semibold text-black">
            {movies.length} titles in "
            {movieGenres
              .filter((g) => selectedGenres.includes(g.id))
              .map((g) => g.name)
              .join(", ") || "Unknown Genre"}
            "
          </p>
          <div className="flex flex-wrap gap-10 py-10 max-w-[1760px] w-fit just ">
            {" "}
            {movies.slice(0, 12).map((value, index) => (
              <MovieCard
                isSmall={false}
                className=""
                onClick={() => handleOnclick(value.id)}
                key={index}
                title={value.title}
                vote_average={value.vote_average}
                poster_path={value.poster_path}
              />
            ))}
            <Pagination className="flex justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?genres=${selectedGenres.join(",")}&page=${
                      pageNumber - 1
                    }`}
                  />
                </PaginationItem>

                {movies.map((value, index) => (
                  <div key={index}>
                    <PaginationItem>
                      <PaginationLink
                        isActive={pageNumber === index + 1}
                        href={`?genres=${selectedGenres.join(",")}&page=${
                          index + 1
                        }`}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  </div>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href={`?genres=${selectedGenres.join(",")}&page=${
                      pageNumber + 1
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Genres;
