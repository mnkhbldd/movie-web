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

type Movie = {
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

type Genre = {
  id: number;
  name: string;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const pageNumber = searchParams.get("page");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const handleMovieClick = (movieId: string) => {
    router.push(`/details/${movieId}`);
  };

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    router.push(`/genres?genres=${genreId}&page=1`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=${pageNumber}&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setMovies(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [searchQuery, pageNumber]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289"
      )
      .then((res) => setGenres(res.data.genres || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

 

  return (
    <div className="flex flex-col gap-10 px-4">
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
            {movies.length} results for "{searchQuery}"
          </p>
          <div className="flex flex-wrap gap-10 py-10 max-w-[1760px] w-fit justify-between">
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
            {movies.length > 0 && (
              <Pagination className="flex justify-end">
                <PaginationContent>
                  <PaginationItem onClick={handlePreviousPage}>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  {movies.map(
                    (_, index) =>
                      index < 3 && (
                        <PaginationItem key={index} onClick={handleNextPage}>
                          <PaginationLink href="#">{index + 1}</PaginationLink>
                        </PaginationItem>
                      )
                  )}
                  <PaginationEllipsis />
                  <PaginationItem onClick={handleNextPage}>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
