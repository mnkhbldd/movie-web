"use client";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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

const SimilarPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));

  const [movieData, setMovieData] = useState<MovieTypes[]>([]);
  const handleOnclick = (id: string) => {
    router.push(`/details/${id}`);
  };

  console.log(searchParams);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.movieType}?language=en-US&page=${currentPage}&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setMovieData(res.data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full flex flex-col gap-[32px] px-[80px] py-20 ">
      <div className="flex justify-between w-full">
        <p className="text-[24px] font-semibold">{params.movieType}</p>
        <Button className="bg-transparent text-black border-none shadow-none">
          See more
          <ArrowRight />
        </Button>
      </div>

      <div className="flex flex-wrap gap-[32px]">
        {" "}
        {movieData.slice(0, 16).map((value, index) => (
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
      </div>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`${params.movieType}?page=${currentPage - 1}`}
            />
          </PaginationItem>

          {movieData.map((value, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage == index + 1}
                  href={`${params.movieType}?page=${currentPage}`}
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
              href={`${params.movieType}?page=${currentPage}`}
              onClick={nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SimilarPage;
