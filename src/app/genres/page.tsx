"use client";

import { MovieCard } from "@/components/MovieCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ArrowRight, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  runtime: number;
};

type movieGenresType = {
  id: number;
  name: string;
};

function Genres() {
  const searchParams = useSearchParams();

  const genres = searchParams.get("genres");
  const page = searchParams.get("page");
  const [moviesByGenre, setMoviesByGenre] = useState<MovieTypes[]>([]);
  const [movieGenres, setmovieGenres] = useState<movieGenresType[]>([]);

  console.log(genres);

  const router = useRouter();
  const [isClicked, setIsClicked] = useState<number | null>(null);

  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleButtonClick = (id: number) => {
    router.push(`/genres?genres=${id}&page=1`);
  };

  const [pageNumber, setPageNumer] = useState(page);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genres}&page=${pageNumber}&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setMoviesByGenre(res.data.results || null))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [genres, pageNumber]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setmovieGenres(res.data.genres || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

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
                  onClick={() => {
                    setIsClicked(value.id);
                    handleButtonClick(value.id);
                  }}
                  key={value.id}
                  variant="outline"
                  className={
                    isClicked === value.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                >
                  {value.name} {isClicked === value.id ? <X /> : <ArrowRight />}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen w-[32px]  px-10"></div>
        <div>
          {" "}
          <p className="text-[24px] font-semibold text-black">
            {moviesByGenre.length} titles in "
            {movieGenres.find((g) => g.id.toString() === genres)?.name ||
              "Unknown Genre"}
            "
          </p>
          <div className="flex flex-wrap gap-10 py-10 max-w-[1760px] w-fit just ">
            {" "}
            {moviesByGenre.slice(0, 12).map((value, index) => (
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
                    href={`?genres=${genres}&page=${Number(pageNumber) - 1}`}
                  />
                </PaginationItem>

                {moviesByGenre.map((value, index) => (
                  <div key={index}>
                    <PaginationItem>
                      <PaginationLink
                        isActive={Number(pageNumber) === index + 1}
                        href={`?genres=${genres}&page=${index + 1}`}
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
                    href={`?genres=${genres}&page=${Number(pageNumber) + 1}`}
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

//https://api.themoviedb.org/3/discover/movie?language=en&with_genres=28&page=1
