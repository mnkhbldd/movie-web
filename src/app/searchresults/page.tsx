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

type GenreType = {
  id: number;
  name: string;
};

function SearchResultsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));

  const handleMovieClick = (movieId: string) => {
    router.push(`/details/${movieId}`);
  };

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/genres?genres=${genreId}&page=1`);
  };

  useEffect(() => {
    const fetchMovieDataAsync = async () => {
      try {
        const { data } = await axiosInstance.get(
          `search/movie?query=${search}&language=en-US&page=${page}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    const fetchGenreAsync = async () => {
      try {
        const { data } = await axiosInstance.get(
          `genre/movie/list?language=en-US&page=1`
        );
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieDataAsync();
    fetchGenreAsync();
  }, [search, page]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-10 px-24">
      <p className="text-3xl font-semibold text-black">Search Results</p>
      <div className="flex items-start">
        <div>
          <div className="w-[387px] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold text-black">Genres</p>
              <p className="text-lg text-black font-normal">
                See lists of movies by genre
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {genres.map((genre) => (
                <Badge
                  onClick={() => {
                    setSelectedGenre(genre.id);
                    handleGenreClick(genre.id);
                  }}
                  key={genre.id}
                  variant="outline"
                  className={
                    selectedGenre === genre.id
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }
                >
                  {genre.name}
                  {selectedGenre === genre.id ? <X /> : <ArrowRight />}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen w-[32px]  px-10"></div>
        <div className="w-fit h-fit">
          <p className="text-2xl font-semibold text-black">
            {movies.length} results for "{search}"
          </p>
          <div className="flex flex-wrap gap-10 py-10 max-w-[1760px] w-fit ">
            {movies.slice(0, 12).map((movie, index) => (
              <MovieCard
                isSmall={false}
                className=""
                onClick={() => handleMovieClick(movie.id)}
                key={index}
                title={movie.title}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            ))}
            <Pagination className="flex justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`searchresults?search=${search}&page=${
                      currentPage - 1
                    }`}
                  />
                </PaginationItem>

                {movies.map((_, index) => {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => {
                          setCurrentPage(index + 1);
                          router.push(
                            `searchresults?search=${search}&page=${index + 1}`
                          );
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`searchresults?search=${search}&page=${
                      currentPage + 1
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

export default SearchResultsPage;
